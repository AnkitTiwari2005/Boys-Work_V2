import * as React from "react"

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OTPInput({ length = 4, value, onChange }: OTPInputProps) {
  const [otp, setOtp] = React.useState<string[]>(Array(length).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    const chars = value.split("").slice(0, length);
    const newOtp = Array(length).fill("");
    chars.forEach((c, i) => newOtp[i] = c);
    setOtp(newOtp);
  }, [value, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      {otp.map((data, index) => {
        return (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={data}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-14 h-14 text-center text-2xl font-heading font-bold rounded-lg border border-outlineVariant/30 bg-surfaceContainerLowest text-onSurface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-colors"
          />
        );
      })}
    </div>
  );
}
