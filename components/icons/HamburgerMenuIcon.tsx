import { SVGProps } from "react";

export default function HamburgerMenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M0 0h512v512H0z" fill="#000000" fillOpacity="0.01"></path>
      <g transform="translate(0,0)">
        <path
          d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"
          fill="#fff"
          fillOpacity="1"
        ></path>
      </g>
    </svg>
  );
}
