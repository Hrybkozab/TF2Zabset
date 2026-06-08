import { useState } from "react";
import { ImageOff } from "lucide-react";
import { getWeaponImageUrl } from "@/data/weaponImageUrls";
import type { Weapon } from "@/types/weapons";

interface Props {
  weapon: Weapon;
  className?: string;
}

export const WeaponImage = ({ weapon, className }: Props) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`grid place-items-center text-muted-foreground ${className ?? ""}`}>
        <ImageOff className="h-5 w-5" aria-hidden />
        <span className="sr-only">No image for {weapon.name}</span>
      </div>
    );
  }

  return (
    <img
      src={getWeaponImageUrl(weapon)}
      alt={weapon.name}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};
