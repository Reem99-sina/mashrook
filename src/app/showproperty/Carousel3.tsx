"use client";
import Image from "next/image";
import { Carousel } from "../components/shared/Mimport";

export function CarouselDefault() {
  return (
    <Carousel className="rounded-xl">
      <Image
        src="https://media.istockphoto.com/id/578830714/photo/white-modern-apartment-house.jpg?s=1024x1024&w=is&k=20&c=B6n0TfjrvKXuhBEY2-viVPGb1O2IsjbYnpnPHx2zeDE="
        alt="image 1"
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        priority
      />
      <Image
        src="https://media.istockphoto.com/id/638342740/photo/modern-luxury-apartment-house-in-berlin.jpg?s=1024x1024&w=is&k=20&c=8v2Gp7z6i1rfDD5qF5_p2ZhyeEtit-yx75HZZnO7Y1s="
        alt="image 2"
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        priority
      />
      <Image
        src="https://media.istockphoto.com/id/1141586118/photo/modern-white-apartment-houses.jpg?s=1024x1024&w=is&k=20&c=NX4V2E0KZMtrL4ts_aI4Nu7Fs6xR5RuNvyxY59vYKRQ="
        alt="image 3"
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        priority
      />
      <Image
        src="https://media.istockphoto.com/id/697020434/photo/modern-white-apartment-houses.jpg?s=1024x1024&w=is&k=20&c=xBkYVpUMvJlCMXYeH-8by8OVqRr6K4P7EnoDdMELVM0="
        alt="image 4"
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        priority
      />
      <Image
        src="https://media.istockphoto.com/id/1078997070/photo/row-of-white-modern-apartment-houses.jpg?s=1024x1024&w=is&k=20&c=QnmaKnrKj0cPDYbtskHJSN0EFjk_KWi4Sup5RopAdF4="
        alt="image 5"
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        priority
      />
      <Image
        src="https://media.istockphoto.com/id/1141586118/photo/modern-white-apartment-houses.jpg?s=1024x1024&w=is&k=20&c=NX4V2E0KZMtrL4ts_aI4Nu7Fs6xR5RuNvyxY59vYKRQ="
        alt="image 6"
        width={1024}
        height={1024}
        style={{ objectFit: "cover" }}
        className="rounded-xl"
        priority
      />
    </Carousel>
  );
}
