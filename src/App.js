import { useState } from "react";
import { motion } from "framer-motion";

// Simple Button component to avoid missing import
const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      margin: "5px",
      borderRadius: "8px",
      border: "1px solid #aaa",
      background: "#f8f8f8",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    {children}
  </button>
);

export default function PerfumeBuilder() {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    bottle: "",
    scent: "",
    color: "",
    strength: "",
    longevity: "",
  });

  const steps = ["Bottle", "Scent", "Color", "Strength", "Longevity"];

  const handleSelect = (key, value) => {
    setSelection({ ...selection, [key]: value });
    setStep(step + 1);
  };

  const isComplete = step > steps.length;

  const bottleOptions = [
    { image: "/images/bottle1.png", volume: "100ml" },
    { image: "/images/bottle2.png", volume: "50ml" },
    { image: "/images/bottle3.png", volume: "100ml" },
  ];

  const scentOptions = ["Rose", "Oud", "Citrus", "Musk"];

  const colorOptions = [
    { name: "Transparent", hex: "#ffffff" },
    { name: "Pink", hex: "#ffc0cb" },
    { name: "Gold", hex: "#ffd700" },
    { name: "Green", hex: "#90ee90" },
    { name: "Red", hex: "#ff0000" },
    { name: "Blue", hex: "#0000ff" },
    { name: "Orange", hex: "#ffa500" },
    { name: "Purple", hex: "#800080" },
    { name: "Yellow", hex: "#ffff00" },
    { name: "Aqua", hex: "#00ffff" },
    { name: "Black", hex: "#000000" },
    { name: "Silver", hex: "#c0c0c0" },
  ];

  const strengthOptions = ["Light", "Medium", "Strong"];
  const longevityOptions = ["4 Hours", "8 Hours", "12+ Hours"];

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 24 }}>
        Build Your Custom Perfume
      </h1>

      {!isComplete && (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: "600", marginBottom: 16 }}>
            Step {step}: Choose {steps[step - 1]}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 16,
            }}
          >
            {step === 1 &&
              bottleOptions.map((bottle, index) => (
                <div
                  key={index}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() =>
                    handleSelect("bottle", `Bottle ${index + 1} - ${bottle.volume}`)
                  }
                >
                  <img
                    src={bottle.image}
                    alt={`Bottle ${index + 1}`}
                    style={{
                      width: "100%",
                      height: 100,
                      objectFit: "contain",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      padding: 4,
                    }}
                  />
                  <p style={{ marginTop: 8 }}>{bottle.volume}</p>
                </div>
              ))}

            {step === 2 &&
              scentOptions.map((scent) => (
                <Button key={scent} onClick={() => handleSelect("scent", scent)}>
                  {scent}
                </Button>
              ))}

            {step === 3 &&
  colorOptions.map((color) => (
    <div
      key={color.name}
      onClick={() => handleSelect("color", color.name)}
      style={{ cursor: "pointer", textAlign: "center" }}
    >
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: color.hex,
          borderRadius: 8,
          // border: "1px solid #999", // ← Removed
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)", // Optional soft shadow
        }}
      />
      <p style={{ marginTop: 8, fontSize: 14 }}>{color.name}</p>
    </div>
  ))}


            {step === 4 &&
              strengthOptions.map((strength) => (
                <Button key={strength} onClick={() => handleSelect("strength", strength)}>
                  {strength}
                </Button>
              ))}

            {step === 5 &&
              longevityOptions.map((longevity) => (
                <Button key={longevity} onClick={() => handleSelect("longevity", longevity)}>
                  {longevity}
                </Button>
              ))}
          </div>
        </motion.div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#e6ffe6",
            padding: 24,
            borderRadius: 16,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
            Your Custom Perfume
          </h2>
          <p>
            <strong>Bottle:</strong> {selection.bottle}
          </p>
          <p>
            <strong>Scent:</strong> {selection.scent}
          </p>
          <p>
            <strong>Color:</strong> {selection.color}
          </p>
          <p>
            <strong>Strength:</strong> {selection.strength}
          </p>
          <p>
            <strong>Longevity:</strong> {selection.longevity}
          </p>
          <Button>Place Order</Button>
        </motion.div>
      )}
    </div>
  );
}
