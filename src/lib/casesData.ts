export type ComponentReading = {
  id: string;
  name: string;
  meta: string;
  reading: string;
  status: "ok" | "warn" | "fail";
  diagnostic: string;
  isFaulty?: boolean;
  emoji: string;
};

export type Hypothesis = { id: string; text: string; correct: boolean };

export type CaseData = {
  id: string;
  number: string;
  title: string;
  fault: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estTime: string;
  category: string;
  xp: number;
  color: "primary" | "secondary" | "accent" | "highlight";
  briefing: string;
  scene: string;
  concepts: string[];
  components: ComponentReading[];
  hypotheses: Hypothesis[];
  explanation: string;
  hint: string;
};

export const CASES: CaseData[] = [
  {
    id: "001",
    number: "001",
    title: "The Silent LED",
    fault: "Reverse Polarity",
    difficulty: "Beginner",
    estTime: "~18 min",
    category: "Electronics",
    xp: 100,
    color: "primary",
    briefing:
      "Minutes before a robotics competition, the robot's indicator LED goes dark. Voltage is present at the pin — but no light. The team is out of time. You're up.",
    scene:
      "A 9V battery drives a 220Ω resistor into a red 5mm LED on a breadboard. Everything looks connected. Nothing glows.",
    concepts: ["LED polarity", "Ohm's Law", "Continuity testing"],
    components: [
      {
        id: "battery",
        name: "9V Battery",
        meta: "PWR · Vin",
        reading: "9.02 V",
        status: "ok",
        diagnostic: "Nominal. Battery is delivering clean 9V.",
        emoji: "🔋",
      },
      {
        id: "resistor",
        name: "Resistor · 220Ω",
        meta: "R7 · 1/4W",
        reading: "219.4 Ω",
        status: "ok",
        diagnostic: "Within tolerance. Current-limiting stage is healthy.",
        emoji: "🟫",
      },
      {
        id: "led",
        name: "Indicator LED",
        meta: "D3 · red 5mm",
        reading: "0.00 mA",
        status: "fail",
        diagnostic:
          "3.3V present at leads · no current flow · anode and cathode appear inverted.",
        isFaulty: true,
        emoji: "🔴",
      },
    ],
    hypotheses: [
      { id: "a", text: "The 9V battery is dead.", correct: false },
      { id: "b", text: "The 220Ω resistor is open-circuit.", correct: false },
      {
        id: "c",
        text: "The LED is installed in reverse — anode and cathode swapped.",
        correct: true,
      },
      { id: "d", text: "The breadboard rails are broken.", correct: false },
    ],
    explanation:
      "LEDs are diodes — current only flows one way. With the anode and cathode reversed, the junction is reverse-biased and no current passes. Voltage still appears across the leads because the circuit is open. Flip the LED and light returns.",
    hint: "Voltage is there but current is zero. Which component is polarity-sensitive?",
  },
  {
    id: "002",
    number: "002",
    title: "The Twitching Servo",
    fault: "Insufficient Power / Ground Loop",
    difficulty: "Beginner",
    estTime: "~22 min",
    category: "Robotics",
    xp: 150,
    color: "secondary",
    briefing:
      "A servo on the robot arm twitches unpredictably instead of holding position. The signal from the microcontroller looks clean. The servo, apparently, disagrees.",
    scene:
      "A hobby servo shares its power rail with the MCU. Under load, the rail sags. Ground is daisy-chained through the breadboard.",
    concepts: ["Current draw", "Power decoupling", "Common ground"],
    components: [
      {
        id: "mcu",
        name: "Microcontroller",
        meta: "PWM · pin 9",
        reading: "50Hz · 1.5ms",
        status: "ok",
        diagnostic: "PWM signal is textbook. MCU is behaving.",
        emoji: "🧠",
      },
      {
        id: "rail",
        name: "5V Power Rail",
        meta: "Vcc",
        reading: "3.8 V (sag)",
        status: "fail",
        diagnostic:
          "Rail collapses to 3.8V under servo load · brown-out territory.",
        isFaulty: true,
        emoji: "⚡",
      },
      {
        id: "servo",
        name: "Hobby Servo",
        meta: "SG90 · 500mA peak",
        reading: "0.42 A draw",
        status: "warn",
        diagnostic: "Drawing 420mA — starving the shared regulator.",
        emoji: "🦾",
      },
      {
        id: "gnd",
        name: "Ground Bus",
        meta: "GND",
        reading: "0.11 V offset",
        status: "warn",
        diagnostic: "Ground offset detected — daisy-chained returns.",
        emoji: "🌀",
      },
    ],
    hypotheses: [
      { id: "a", text: "PWM signal is wrong.", correct: false },
      {
        id: "b",
        text: "Servo starves the shared rail — needs its own power supply and a common ground.",
        correct: true,
      },
      { id: "c", text: "The servo is mechanically broken.", correct: false },
      { id: "d", text: "The MCU is overheating.", correct: false },
    ],
    explanation:
      "Servos pull huge inrush current when they move. Sharing a small regulator with the MCU causes the rail to sag, browning out the logic mid-command. The fix is a dedicated supply for the servo — and a single, solid ground shared between both.",
    hint: "The signal is honest. Something else is starving under load.",
  },
  {
    id: "003",
    number: "003",
    title: "The Ghost Sensor",
    fault: "Floating Pin / Missing Pull-up",
    difficulty: "Intermediate",
    estTime: "~25 min",
    category: "Sensors",
    xp: 200,
    color: "accent",
    briefing:
      "A button-triggered sensor fires readings even when nobody touches it. The values dance between HIGH and LOW at random. The team suspects ghosts.",
    scene:
      "A push-button is wired between an MCU input and ground. No resistor to Vcc. The input floats when the button is released.",
    concepts: ["Digital inputs", "Pull-up resistors", "Noise immunity"],
    components: [
      {
        id: "button",
        name: "Push Button",
        meta: "SW1 · momentary",
        reading: "closed OK",
        status: "ok",
        diagnostic: "Mechanically fine. Closes cleanly when pressed.",
        emoji: "🔘",
      },
      {
        id: "pin",
        name: "MCU Input Pin",
        meta: "GPIO · D2",
        reading: "floating",
        status: "fail",
        diagnostic:
          "Reads 0.4V–2.8V unpredictably when button is released · input is floating.",
        isFaulty: true,
        emoji: "👻",
      },
      {
        id: "wire",
        name: "Signal Wire",
        meta: "jumper",
        reading: "continuity OK",
        status: "ok",
        diagnostic: "No breaks. Continuity confirmed.",
        emoji: "🧵",
      },
    ],
    hypotheses: [
      { id: "a", text: "The button is broken.", correct: false },
      { id: "b", text: "The MCU is defective.", correct: false },
      {
        id: "c",
        text: "The input pin floats — needs a pull-up resistor to Vcc (or INPUT_PULLUP mode).",
        correct: true,
      },
      { id: "d", text: "The wire has a short.", correct: false },
    ],
    explanation:
      "A digital input with nothing driving it is antenna. It picks up mains hum, hand capacitance, everything. A pull-up resistor to Vcc (or the MCU's internal INPUT_PULLUP) ties the pin firmly HIGH until the button pulls it LOW. Ghosts, gone.",
    hint: "When the button is released, what actually holds that pin at a known voltage?",
  },
  {
    id: "004",
    number: "004",
    title: "The Missing Signal",
    fault: "Baud Rate Mismatch / Loose Wire",
    difficulty: "Intermediate",
    estTime: "~28 min",
    category: "Communication",
    xp: 250,
    color: "highlight",
    briefing:
      "Two MCUs are supposed to talk over serial. Instead, one sends beautiful data — and the other prints garbage. Occasionally, nothing at all.",
    scene:
      "TX/RX between two microcontrollers. One is configured at 9600 baud, the other at 115200. The RX wire is loose on the breadboard.",
    concepts: ["UART", "Baud rate", "Signal integrity"],
    components: [
      {
        id: "tx",
        name: "MCU A (TX)",
        meta: "9600 baud",
        reading: "clean UART",
        status: "ok",
        diagnostic: "Transmitting proper frames at 9600 baud.",
        emoji: "📤",
      },
      {
        id: "rx",
        name: "MCU B (RX)",
        meta: "115200 baud",
        reading: "garbage bytes",
        status: "fail",
        diagnostic:
          "Configured at 115200 · sampling at wrong intervals · decodes as noise.",
        isFaulty: true,
        emoji: "📥",
      },
      {
        id: "wire",
        name: "RX Jumper Wire",
        meta: "signal path",
        reading: "intermittent",
        status: "warn",
        diagnostic: "Continuity drops when board is nudged.",
        emoji: "🪢",
      },
    ],
    hypotheses: [
      { id: "a", text: "TX MCU is broken.", correct: false },
      {
        id: "b",
        text: "Baud rates don't match — both MCUs must agree on speed.",
        correct: true,
      },
      { id: "c", text: "The MCUs are incompatible.", correct: false },
      { id: "d", text: "Voltage levels are wrong.", correct: false },
    ],
    explanation:
      "UART has no clock line — both sides must agree on baud rate up front. Sampling at the wrong speed slices the signal into meaningless bits. Match the baud rate, seat the wire firmly, and the conversation resumes.",
    hint: "The wire matters. But so does the language both sides are speaking.",
  },
  {
    id: "005",
    number: "005",
    title: "The Power Mystery",
    fault: "Overcurrent Protection Tripped",
    difficulty: "Advanced",
    estTime: "~32 min",
    category: "Power",
    xp: 300,
    color: "primary",
    briefing:
      "The whole robot cuts out under acceleration. Batteries are fresh. Motors are cool. Yet every hard turn kills the power. The team is convinced the battery is lying.",
    scene:
      "A BMS-protected LiPo drives two motors through a shared bus. Peak stall current exceeds the BMS current limit, triggering shutdown.",
    concepts: ["Peak current", "BMS protection", "Motor inrush"],
    components: [
      {
        id: "batt",
        name: "LiPo Pack",
        meta: "3S · BMS",
        reading: "12.4 V idle",
        status: "ok",
        diagnostic: "Voltage nominal at rest. Cells balanced.",
        emoji: "🔋",
      },
      {
        id: "bms",
        name: "BMS Board",
        meta: "20A limit",
        reading: "trips @ 22A",
        status: "fail",
        diagnostic:
          "Overcurrent protection engages on motor stall · shuts entire bus.",
        isFaulty: true,
        emoji: "🛡️",
      },
      {
        id: "motorL",
        name: "Left Motor",
        meta: "brushed DC",
        reading: "11A stall",
        status: "warn",
        diagnostic: "Draws 11A at stall.",
        emoji: "⚙️",
      },
      {
        id: "motorR",
        name: "Right Motor",
        meta: "brushed DC",
        reading: "11A stall",
        status: "warn",
        diagnostic: "Draws 11A at stall. Combined = 22A.",
        emoji: "⚙️",
      },
    ],
    hypotheses: [
      { id: "a", text: "Battery is dead.", correct: false },
      { id: "b", text: "One motor is shorted.", correct: false },
      {
        id: "c",
        text: "Combined motor stall current exceeds the BMS limit — protection cuts the bus.",
        correct: true,
      },
      { id: "d", text: "The MCU is rebooting.", correct: false },
    ],
    explanation:
      "Each motor pulls ~11A at stall. Together they exceed the BMS's 20A safety threshold, and the protection circuit does exactly what it's designed to do: cut power. The fix is current limiting in software (ramp PWM) or a higher-rated BMS — not blaming the battery.",
    hint: "One motor is fine. Two motors — pulling hard at the same time — is a different story.",
  },
];

export const totalXpAvailable = CASES.reduce((s, c) => s + c.xp, 0);