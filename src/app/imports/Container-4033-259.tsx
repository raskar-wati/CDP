import svgPaths from "./svg-mgnye0hypj";
import imgImage46 from "figma:asset/7231292d14004cdcf5fe06abff1c38673deefd4e.png";

function FacebookMessenger() {
  return (
    <div
      className="absolute bottom-0 left-[57.143%] right-0 top-[57.143%]"
      data-name="Facebook Messenger"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
      >
        <g id="Facebook Messenger">
          <rect fill="var(--fill-0, white)" height="12" rx="6" width="12" />
          <path
            d={svgPaths.p1e5fde00}
            fill="url(#paint0_radial_4033_263)"
            id="Vector"
          />
          <path
            d={svgPaths.p275d7880}
            fill="var(--fill-0, black)"
            id="Vector_2"
            opacity="0.05"
          />
          <path
            d={svgPaths.p4269100}
            fill="var(--fill-0, black)"
            id="Vector_3"
            opacity="0.07"
          />
          <path
            d={svgPaths.p37c42900}
            fill="var(--fill-0, white)"
            id="Vector_4"
          />
        </g>
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="translate(2.77183 10.7445) scale(11.903 11.903)"
            gradientUnits="userSpaceOnUse"
            id="paint0_radial_4033_263"
            r="1"
          >
            <stop stopColor="#1292FF" />
            <stop offset="0.079" stopColor="#2982FF" />
            <stop offset="0.23" stopColor="#4E69FF" />
            <stop offset="0.351" stopColor="#6559FF" />
            <stop offset="0.428" stopColor="#6D53FF" />
            <stop offset="0.754" stopColor="#DF47AA" />
            <stop offset="0.946" stopColor="#FF6257" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <div
        className="absolute aspect-[64/64] bg-center bg-cover bg-no-repeat left-0 right-0 top-0"
        data-name="image 46"
        style={{ backgroundImage: `url('${imgImage46}')` }}
      />
      <FacebookMessenger />
    </div>
  );
}