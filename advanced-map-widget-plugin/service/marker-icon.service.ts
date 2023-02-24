import { Injectable } from "@angular/core";
import { divIcon, DivIcon } from "leaflet";

@Injectable({ providedIn: "root" })
export class MarkerIconService {
  getIcon(
    iconClassName = "dlt-c8y-icon-globe",
    classNames = "",
    color = "#fff"
  ): DivIcon {
    if (!iconClassName.startsWith("dlt-c8y-icon")) {
      iconClassName = "dlt-c8y-icon-" + iconClassName;
    }
    const html = `<span style="position:absolute;left: 34px;top: 20px;" class="${classNames} ${iconClassName}"></span>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="80px"
      height="60px"
      viewBox="0 0 365 560"
      enable-background="new 0 0 365 560"
      xml:space="preserve"
    >
      <g>
        <path
          fill="${color}"
          d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9 C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z"
        />
      </g>
    </svg>`;

    return divIcon({
      html,
      iconSize: [80, 60],
      iconAnchor: [40, 60],
      className: "div-icon",
    });
  }
}
