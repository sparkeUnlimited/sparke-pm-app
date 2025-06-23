import "/styles/globals.css";
import "/styles/calendar.css";

export const metadata = {
  title: "Spark-E PM App",
  description:
    "Delivering projects on time and within budget. Providing sustainable electrical services for residential and commercial customers.",
  keywords:
    "electrician, contractor, EV chargers, panel upgrades, energy-efficient, fire alarm, commercial, residential",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
