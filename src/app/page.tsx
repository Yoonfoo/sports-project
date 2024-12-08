import Image from "next/image";
import Link from "next/link";
import logoPic from "../../public/sports-website-logo-transformed.webp";

export default function Home() {
  return (
    <div className="p-8 bg-gray-200">
      <Image src={logoPic} alt="logo" width={100} height={100} className="mx-8"/>
      <Link href="/" className="mx-8">Home</Link>
      <Link href="/player" className="mx-8">Player</Link>
      <Link href="/playerStats" className="mx-8">Stats</Link>
      <Link href="/scoreboard" className="mx-8">Schedule</Link>
    </div>
  );
}
