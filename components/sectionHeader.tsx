import clsx from "clsx";
import { Text } from "react-native";

export const SectionHeader = ({ children, textClassName }: { children: React.ReactNode; textClassName?: string }) => (
    <Text className={clsx("text-darkBlue font-avantGardeBold text-2xl md:text-3xl", textClassName)}>{children}</Text>
);
