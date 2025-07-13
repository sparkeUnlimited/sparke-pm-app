import "/styles/globals.css";
import "/styles/calendar.css";

export const metadata = {
  title: "Fitness App - Spark-E",
  description:
    "Providing Food tracking and exercise information for a healthy lifestyle",
  keywords:
    "fit, fitness, food, health, exercise, workout, macros, calories",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      {children}
    </body>
  </html>
);

export default RootLayout;
