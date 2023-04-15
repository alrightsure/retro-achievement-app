import clsx from "clsx";
import { Text } from "react-native";

export const GeneralText = ({ children, textClassName }: { children: React.ReactNode; textClassName?: string }) => (
    <Text className={clsx("text-white font-avantGarde md:text-2xl", textClassName)}>{children}</Text>
);
