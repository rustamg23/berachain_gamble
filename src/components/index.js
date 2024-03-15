// Кэш для хранения загруженных изображений символов,
// чтобы не загружать одно и то же изображение несколько раз
const cache = {};

class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name; // Имя символа, используется для выбора изображения

    // Проверяем, есть ли изображение в кэше
    if (cache[name]) {
      // Если есть, клонируем его для использования
      this.img = cache[name].cloneNode();
    } else {
      // Если нет, создаем новый элемент изображения и загружаем в него изображение
      this.img = new Image();
      this.img.src = require(`../assets/symbols/${name}.svg`);

      // Добавляем загруженное изображение в кэш
      cache[name] = this.img;
    }
  }

  // Метод для предзагрузки всех символов, чтобы изображения были готовы к моменту их отображения
  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  // Статический геттер для получения списка всех возможных символов
  static get symbols() {
    return [
      "at_at",
      "c3po",
      "darth_vader",
      "death_star",
      "falcon",
      "r2d2",
      "stormtrooper",
      "tie_ln",
      "yoda",
    ];
  }

  // Статический метод для получения случайного символа из списка
  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}

class Reel {
  constructor(reelContainer, idx, initialSymbols) {
    this.reelContainer = reelContainer;// DOM-элемент, содержащий этот барабан
    this.idx = idx;// Индекс (позиция) барабана в слот-машине
    // Создаем контейнер для символов внутри барабана
    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);
    // Начальная анимация для барабана. Параметры анимации будут установлены позже
    // Эта анимация создает визуальный эффект вращения
    this.animation = this.symbolContainer.animate(
      [
        // We cannot animate translateY & filter at the same time in safari for some reasons,
        // so we go with animating top & filter instead.
        { top: 0, filter: "blur(0)" },
        { filter: "blur(2px)", offset: 0.5 },
        {
          top: `calc((${Math.floor(this.factor) * 10} / 3) * -100% - (${
            Math.floor(this.factor) * 10
          } * 3px))`,

          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 1000,
        easing: "ease-in-out",
      }
    );
    this.animation.cancel(); // Сразу отменяем анимацию, чтобы она не началась автоматически
 // Добавление начальных символов в барабан
    initialSymbols.forEach((symbol) =>
      this.symbolContainer.appendChild(new Symbol(symbol).img)
    );
  }

  get factor() {
    return 1 + Math.pow(this.idx / 2, 2);
  }

  renderSymbols(nextSymbols) {
    const fragment = document.createDocumentFragment();

    for (let i = 3; i < 3 + Math.floor(this.factor) * 10; i++) {
      const icon = new Symbol(
        i >= 10 * Math.floor(this.factor) - 2
          ? nextSymbols[i - Math.floor(this.factor) * 10]
          : undefined
      );
      fragment.appendChild(icon.img);
    }

    this.symbolContainer.appendChild(fragment);
  }
// Метод для "вращения" барабана, то есть запуска анимации
spin() {
  // Создание промиса, который разрешится по окончании анимации
  const animationPromise = new Promise(
    (resolve) => (this.animation.onfinish = resolve)
  );
  // Создание таймаута, как запасной вариант, на случай если анимация не завершится как ожидается
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(resolve, this.factor * 1000)
  );

  // Отменяем предыдущую анимацию, если она еще не завершена
  this.animation.cancel();
  // Запуск анимации вращения
  this.animation.play();

  // Используем Promise.race для обработки ситуации, когда анимация завершится или истечет таймер
  // Это гарантирует, что функция spin не "зависнет", если с анимацией что-то пойдет не так
  return Promise.race([animationPromise, timeoutPromise]).then(() => {
    // Убедимся, что анимация полностью завершилась
    if (this.animation.playState !== "finished") this.animation.finish();

    // Удаление верхних символов, которые больше не видны после вращения
    // Это позволяет избежать переполнения DOM ненужными элементами
    const max = this.symbolContainer.children.length - 3;
    for (let i = 0; i < max; i++) {
      this.symbolContainer.firstChild.remove();
    }
  });
}

}


class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.nextSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin() {
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}


const config = {
  inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
  onSpinStart: (symbols) => {
    console.log("onSpinStart", symbols);
  },
  onSpinEnd: (symbols) => {
    console.log("onSpinEnd", symbols);
  },
};

const slot = new Slot(document.getElementById("slot"), config);
