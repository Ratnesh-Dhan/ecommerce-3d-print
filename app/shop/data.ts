export type ProductCategory =
  | "microcontrollers"
  | "sensors"
  | "motors"
  | "power"
  | "filaments"
  | "designs";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  stock: number;
  image: string[];
  specs: string[];
}


export const productsData: Product[] = [
  { id: "esp32-devkit", name: "ESP32 NodeMCU Development Board", category: "microcontrollers", price: 430, rating: 4.8, stock: 25, image: ["/images/eletronics/esp32-devkit/img-1.webp", "/images/eletronics/esp32-devkit/img-2.webp", "/images/eletronics/esp32-devkit/img-3.webp"], specs: ["Dual-core Tensilica LX6", "Wi-Fi & Bluetooth integrated", "38 GPIO pins"] },
  { id: "arduino-uno-r3", name: "Arduino Uno R3 (CH340G Compatible)", category: "microcontrollers", price: 499, rating: 4.7, stock: 18, image: ["/images/eletronics/uno-r3/img-1.webp", "/images/eletronics/uno-r3/img-2.webp", "/images/eletronics/uno-r3/img-3.webp", "/images/eletronics/uno-r3/img-4.webp",], specs: ["ATmega328P MCU", "14 Digital I/O, 6 Analog Input", "5V Operating Voltage"] },
  { id: "dht22-sensor", name: "DHT22 Temperature & Humidity Sensor", category: "sensors", price: 120, rating: 4.6, stock: 40, image: ["/images/eletronics/dht22.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["High precision capacitive sensor", "3.3V to 6V input", "0-100% Humidity range"] },
  { id: "nema17-stepper", name: "NEMA 17 Stepper Motor (4.2kg-cm)", category: "motors", price: 749, rating: 4.9, stock: 12, image: ["/images/eletronics/nema_17.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["1.8 deg Step Angle", "1.5A rated current", "4-lead wire connection"] },
  { id: "tp4056-charger", name: "TP4056 Micro-USB Li-Ion Charger Board", category: "power", price: 35, rating: 4.5, stock: 120, image: ["/images/eletronics/tp4056.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["1A Linear Charging Current", "With protection circuit", "Status LEDs indication"] },
  { id: "pla-filament-yellow", name: "Premium PLA+ 3D Printer Filament (Yellow, 1kg)", category: "filaments", price: 1099, rating: 4.9, stock: 15, image: ["/images/white-pla-filament/img-1.webp", "/images/white-pla-filament/img-2.webp", "/images/white-pla-filament/img-3.webp"], specs: ["1.75mm diameter, ±0.02mm tolerance", "190°C - 220°C print temp", "High layer adhesion"] },
  { id: "sg90-servo", name: "SG90 Micro Servo Motor 9g", category: "motors", price: 120, rating: 4.4, stock: 65, image: ["/images/lithophanes/img-1.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["1.6kg/cm stall torque", "180 degree rotation speed", "Lightweight nylon gears"] },
  { id: "ultrasonic-hcsr04", name: "HC-SR04 Ultrasonic Distance Sensor", category: "sensors", price: 85, rating: 4.6, stock: 55, image: ["/images/eletronics/hc_sr04.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["2cm to 400cm range", "40kHz frequency", "5V operating voltage"] },
  { id: "lithophane-lamps", name: "Lithophane Lamps", category: "designs", price: 1299, rating: 4.9, stock: 20, image: ["/images/lithophanes/img-1.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["Customizable photo", "LED powered", "Premium PLA"] },
  { id: "personalized-lithophane-frames", name: "Personalized Lithophane Photo Frames", category: "designs", price: 1099, rating: 4.8, stock: 15, image: ["/images/personalized-lithophane-photo-frames/img-1.webp", "/images/personalized-lithophane-photo-frames/img-2.webp", "/images/personalized-lithophane-photo-frames/img-3.webp"], specs: ["High resolution", "LED backlight", "Custom size"] },
  { id: "spiral-vases", name: "Spiral Vases", category: "designs", price: 799, rating: 4.7, stock: 30, image: ["/images/spiral-vases/img-1.webp", "/images/spiral-vases/img-2.webp", "/images/spiral-vases/img-3.webp"], specs: ["Elegant design", "Durable PETG", "Various heights"] },
  { id: "modern-planters", name: "Modern Planters", category: "designs", price: 999, rating: 4.8, stock: 25, image: ["/images/modern-planters/img-1.webp", "/images/modern-planters/img-2.webp", "/images/modern-planters/img-3.webp"], specs: ["Self-watering", "Eco-friendly PLA", "Various sizes"] },
  { id: "personalized-nameplates", name: "Personalized Nameplates", category: "designs", price: 399, rating: 4.9, stock: 40, image: ["/images/personalized-nameplates/img-1.webp", "/images/personalized-nameplates/img-2.webp", "/images/personalized-nameplates/img-3.webp"], specs: ["Laser engraved", "Custom text", "Premium material"] },
  { id: "custom-keychains", name: "Custom Keychains", category: "designs", price: 299, rating: 4.6, stock: 60, image: ["/images/lithophanes/img-1.jpg", "/images/lithophanes/img-2.jpg", "/images/lithophanes/img-3.jpg"], specs: ["Metallic finish", "Personalized engraving", "Durable"] },
  { id: "mobile-phone-stands", name: "Mobile Phone Stands", category: "designs", price: 499, rating: 4.7, stock: 35, image: ["/images/mobile-phone-stands/img-1.webp", "/images/mobile-phone-stands/img-2.webp", "/images/mobile-phone-stands/img-3.webp"], specs: ["Adjustable angle", "Non-slip base", "Compact"] },
  { id: "desk-organizers", name: "Desk Organizers", category: "designs", price: 799, rating: 4.8, stock: 22, image: ["/images/desk-organizers/img-1.webp", "/images/desk-organizers/img-2.webp", "/images/desk-organizers/img-3.webp"], specs: ["Multiple compartments", "Modern design", "Sturdy"] },
  { id: "cable-organizers", name: "Cable Organizers", category: "designs", price: 199, rating: 4.5, stock: 50, image: ["/images/cable-organizers/img-1.webp", "/images/cable-organizers/img-2.webp", "/images/cable-organizers/img-3.webp"], specs: ["Flexible", "Reusable", "Easy clip"] },
  { id: "headphone-stands", name: "Headphone Stands", category: "designs", price: 599, rating: 4.7, stock: 28, image: ["/images/headphone-stands/img-1.webp", "/images/headphone-stands/img-2.webp", "/images/headphone-stands/img-3.webp"], specs: ["Aluminum frame", "Cable management", "Stable base"] },
  { id: "controller-stands", name: "Controller Stands", category: "designs", price: 649, rating: 4.6, stock: 18, image: ["/images/controller-stands/img-1.webp", "/images/controller-stands/img-2.webp", "/images/controller-stands/img-3.webp"], specs: ["Fit for PS, Xbox", "High quality", "Non-slip"] },
  { id: "articulated-dragons", name: "Articulated Dragons", category: "designs", price: 999, rating: 4.9, stock: 10, image: ["/images/controller-stands/img-1.webp", "/images/controller-stands/img-2.webp", "/images/controller-stands/img-3.webp"], specs: ["Fully poseable", "High detail", "Premium resin"] },
  { id: "articulated-octopus", name: "Articulated Octopus", category: "designs", price: 799, rating: 4.8, stock: 12, image: ["/images/articulated-octopus/img-1.webp", "/images/articulated-octopus/img-2.webp", "/images/articulated-octopus/img-3.webp"], specs: ["Multiple limbs", "Flexible joints", "Resin"] },
  { id: "raspberry-pi-arduino-cases", name: "Raspberry Pi & Arduino Cases", category: "designs", price: 499, rating: 4.7, stock: 25, image: ["/images/raspberry-pi-and-arduino-cases/img-1.webp", "/images/raspberry-pi-and-arduino-cases/img-2.webp", "/images/raspberry-pi-and-arduino-cases/img-3.webp"], specs: ["Custom fit", "Ventilation", "Durable"] },
];
