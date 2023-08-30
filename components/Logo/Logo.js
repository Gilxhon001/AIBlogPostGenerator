import Image from "next/image";

export const Logo = () => {
  return (
      <div className="flex justify-center py-4">
        <Image
            src="/LogoTransparent.png"
            alt="Blog Logo"
            width={284}
            height={160}
        />
      </div>

  );
};
