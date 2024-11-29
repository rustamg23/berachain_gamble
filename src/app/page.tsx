import ActionButton from "@/components/action-button";
import Discord from "@/components/icons/discord";
import Gitbook from "@/components/icons/gitbook";
import Mirror from "@/components/icons/mirror";
import X from "@/components/icons/x";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    href: "https://discord.com/invite/wPKgTwthec",
    icon: Discord,
    label: "Discord",
  },
  { href: "https://x.com/JunkyUrsas", icon: X, label: "X" },
  { href: "https://docs.junkyursas.com/", icon: Gitbook, label: "Gitbook" },
  {
    href: "https://mirror.xyz/0x233404B1F7d0cB9533Abe1d17552Fd191FD56877",
    icon: Mirror,
    label: "Mirror",
  },
];

export default function Home() {
  return (
    <main className="relative h-[100svh] overflow-hidden flex flex-col m:flex-row gap-8">
      <Image
        src="/wood.svg"
        alt="bg-wood"
        fill
        className="object-cover z-[-1]"
      />
      <div className="z-[1] pt-4 px-4 m:px-[10%] flex flex-col items-center m:justify-center m:items-start h-full">
        <h1 className="text-[40px] xs:text-[64px] m:text-[100px] font-bowlby mb-4">
          JUNKY URSAS
        </h1>
        <h2 className="m:max-w-[609px] mb-3 m:mb-6 text-[16px] xs:text-[20px]">
          GambleFi hub of Berachain with unique features like LP providing Vaults and BGT incentives
        </h2>
        <div className="flex items-center gap-8 mb-3 m:mb-6">
          {socials.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              className="w-12 h-12 xs:w-16 xs:h-16 flex items-center justify-center bg-[#001E1D] rounded-full hover:scale-[1.08] transition-all"
            >
              <link.icon className="w-6 xs:w-auto" />
            </Link>
          ))}
        </div>
        <ActionButton />
      </div>
      <Image
        src="/junky-ursas.svg"
        alt="junky-ursas"
        width={619}
        height={949}
        className="mx-auto max-w-[297px] relative m:absolute m:max-w-[478px] md:max-w-[573px] l:max-w-[630px] bottom-0 m:right-[10%]"
      />
    </main>
  );
}
