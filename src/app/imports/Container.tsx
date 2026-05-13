import svgPaths from "./svg-vzoj0ovust";
import imgImage45 from "figma:asset/fc80f0f1b7534071bc8b5f8104a5217bf5734c1f.png";

function Container() {
  return (
    <div
      className="absolute bottom-[-1.607%] left-0 right-[-1.607%] top-0"
      data-name="Container"
    >
      <div className="size-full" />
    </div>
  );
}

function Frame2435() {
  return (
    <div className="absolute left-[0.75px] size-[10.5px] top-[0.75px]">
      <div className="absolute inset-[-7.143%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 13 13"
        >
          <g id="Frame 2435">
            <rect
              height="10.5"
              rx="2"
              stroke="var(--stroke-0, white)"
              strokeWidth="1.5"
              width="10.5"
              x="1"
              y="1"
            />
            <path
              d={svgPaths.pbd1b9c0}
              fill="url(#paint0_radial_4032_50)"
              id="Vector"
            />
            <path
              d={svgPaths.pbd1b9c0}
              fill="url(#paint1_radial_4032_50)"
              id="Vector_2"
            />
            <path
              d={svgPaths.pbd1b9c0}
              fill="url(#paint2_radial_4032_50)"
              id="Vector_3"
            />
            <path
              d={svgPaths.p258f4800}
              fill="var(--fill-0, white)"
              id="Vector_4"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p195ab180}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector_5"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p261a4c40}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector_6"
            />
          </g>
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(4.75 8.875) rotate(-55.3758) scale(9.56985)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial_4032_50"
              r="1"
            >
              <stop stopColor="#B13589" />
              <stop offset="0.79309" stopColor="#C62F94" />
              <stop offset="1" stopColor="#8A3AC8" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(4.375 11.875) rotate(-65.1363) scale(8.47283)"
              gradientUnits="userSpaceOnUse"
              id="paint1_radial_4032_50"
              r="1"
            >
              <stop stopColor="#E0E8B7" />
              <stop offset="0.444662" stopColor="#FB8A2E" />
              <stop offset="0.71474" stopColor="#E2425C" />
              <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(0.4375 1.375) rotate(-8.1301) scale(14.5841 3.11938)"
              gradientUnits="userSpaceOnUse"
              id="paint2_radial_4032_50"
              r="1"
            >
              <stop offset="0.156701" stopColor="#406ADC" />
              <stop offset="0.467799" stopColor="#6A45BE" />
              <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function InstagramLogo() {
  return (
    <div
      className="absolute bottom-0 left-[57.143%] overflow-clip right-0 top-[57.143%]"
      data-name="Instagram logo"
    >
      <Frame2435 />
    </div>
  );
}

export default function Container1() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container />
      <div
        className="absolute aspect-[57/57] bg-center bg-cover bg-no-repeat left-0 right-[-1.786%] top-0"
        data-name="image 45"
        style={{ backgroundImage: `url('${imgImage45}')` }}
      />
      <InstagramLogo />
    </div>
  );
}