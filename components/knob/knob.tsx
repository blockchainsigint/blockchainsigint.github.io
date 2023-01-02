import { useEffect, useState } from "react";
import styles from "./knob.module.css";

interface Props {
  label?: string;
  size: number;
  progress?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: "round" | "inherit" | "butt" | "square";
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
  max?: number;
}

export const Knob = (props: Props) => {
  let {
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = `#ddd`,
    indicatorWidth = 10,
    indicatorColor = `#07c`,
    indicatorCap = `round`,
    label = ``,
    labelColor = `#333`,
    spinnerMode = false,
    spinnerSpeed = 1,
    max = 100,
  } = props;

  if (max < 100) {
    //convert progress to max
    progress = (progress * 100) / max;
  }

  const [value, setValue] = useState(props.progress);
  const [normalizedValue, setNormalizedValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setNormalizedValue((Number(e.target.value) * 100) / max);
  };

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius;

  let hideLabel = size < 100 || !label.length || spinnerMode ? true : false;

  function createBinaryString() {
    let temp = value;
    if (value > max) temp = value - max - 1;
    if (value < 0) temp = max + value + 1;
    let result = (temp >>> 0).toString(2);
    //pad with 0s
    while (result.length < 4) {
      result = "0" + result;
    }
    return result;
  }

  return (
    <>
      <div
        className={`${styles["svg-pi-wrapper"]} ${
          value > max || value < 0 ? styles["shakeobj"] : ""
        }`}
        style={{ width: size, height: size }}
      >
        <svg className={styles["svg-pi"]} style={{ width: size, height: size }}>
          <circle
            className={styles["svg-pi-track"]}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`${styles["svg-pi-indicator"]} ${
              spinnerMode ? styles["svg-pi-indicator__spinner"] : ""
            }`}
            style={{ animationDuration: `${spinnerSpeed}s` }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashArray * ((100 - normalizedValue) / 100)}
            strokeLinecap={indicatorCap}
          />
        </svg>

        {!hideLabel && (
          <div className={styles["svg-pi-label"]} style={{ color: labelColor }}>
            <span className={styles["svg-pi-label__loading"]}>
              <strong>{createBinaryString()}</strong>
              <br />
              {value > max && "Overflow"}
              {value < 0 && "Underflow"}
            </span>

            {!spinnerMode && (
              <span className={styles["svg-pi-label__progress"]}>
                {/* visualize overflow */}
                {value <= max && value >= 0 && value}
                {value > max && value - max - 1}
                {value < 0 && max + value + 1}
              </span>
            )}
          </div>
        )}
        <input
          type="number"
          onChange={handleChange}
          value={value}
          style={{
            marginTop: 16,
            width: size,
            height: 30,
            fontSize: 20,
            textAlign: "center",
          }}
          max={max * 2}
          min={max * -1}
        />
      </div>
    </>
  );
};
