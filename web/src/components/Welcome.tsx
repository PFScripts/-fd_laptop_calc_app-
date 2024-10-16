import React, { useState } from "react";
import { DEFAULT_THEME, Divider, Paper, Text, Button, Group, Stack, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNuiEvent } from "../hooks/useNuiEvent";

const Welcome: React.FC = () => {
    const theme = DEFAULT_THEME;

    const { appReady, sendNotification } = window as any;


    if (appReady) {
        appReady();
    }

    useNuiEvent<any>("testingMessage", (data: any) => {
        console.log("Received testingMessage");
        console.log(JSON.stringify(data, null, 2));
    });

    const [input, setInput] = useState<string>("");
    const [result, setResult] = useState<string>("");


    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const isLargeScreen = useMediaQuery("(min-width: 1200px)");


    const handleClick = (value: string) => {
        if (result) {

            setResult("");
        }
        setInput((prevInput) => prevInput + value);
    };


    const calculate = () => {
        try {
            const evalResult = eval(input).toString();
            setResult(evalResult);
            setInput("");
        } catch (error) {
            setResult("Error");
            setInput("");
        }
    };


    const clear = () => {
        setInput("");
        setResult("");
    };


    const calculatorStyles = isSmallScreen
        ? {
            width: "300px",
            height: "430px",
            padding: "15px",
        }
        : isLargeScreen
            ? {
                width: "600px",
                height: "600px",
                padding: "30px",
            }
            : {
                width: "500px",
                height: "600px",
                padding: "25px",
            };

    const displayStyles = isSmallScreen
        ? {
            fontSize: "20px",
            padding: "10px",
        }
        : isLargeScreen
            ? {
                fontSize: "36px",
                padding: "20px",
            }
            : {
                fontSize: "28px",
                padding: "15px",
            };

    const buttonSize = isSmallScreen
        ? { width: 20, height: 45, fontSize: 16 }
        : isLargeScreen
            ? { width: 90, height: 70, fontSize: 28 }
            : { width: 90, height: 70, fontSize: 22 };


    const operatorButtonStyle = {
        color: theme.colors.orange[6],
        backgroundColor: theme.colors.dark[4],
        ...buttonSize,
    };

    const equalsButtonStyle = {
        backgroundColor: "red",
        color: "white",
        ...buttonSize,
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1a1a1a",
                backdropFilter: "blur(8px)",
            }}
        >
            <Paper
                className="calculator"
                style={{
                    backgroundColor: theme.colors.dark[8],
                    borderRadius: 10,
                    ...calculatorStyles,
                }}
            >
                <Text size="xl" fw={700} style={{ marginBottom: 10 }}>
                    Calculator
                </Text>

                {/* Combined Display for Input and Result */}
                <TextInput
                    value={input + (result ? result : "")}
                    placeholder="0"
                    readOnly
                    style={{
                        textAlign: "right",
                        backgroundColor: theme.colors.dark[8],
                        borderRadius: 8,
                        ...displayStyles,
                        marginBottom: 15,
                    }}
                />

                {/* Calculator Buttons */}
                <Stack spacing="sm">
                    <Group position="center" grow>
                        {["7", "8", "9", "/"].map((item) => (
                            <Button
                                key={item}
                                onClick={() => handleClick(item)}
                                style={item === "/" ? operatorButtonStyle : buttonSize}
                            >
                                {item}
                            </Button>
                        ))}
                    </Group>
                    <Group position="center" grow>
                        {["4", "5", "6", "*"].map((item) => (
                            <Button
                                key={item}
                                onClick={() => handleClick(item)}
                                style={item === "*" ? operatorButtonStyle : buttonSize}
                            >
                                {item}
                            </Button>
                        ))}
                    </Group>
                    <Group position="center" grow>
                        {["1", "2", "3", "-"].map((item) => (
                            <Button
                                key={item}
                                onClick={() => handleClick(item)}
                                style={item === "-" ? operatorButtonStyle : buttonSize}
                            >
                                {item}
                            </Button>
                        ))}
                    </Group>
                    <Group position="center" grow>
                        {["0", ".", "="].map((item) => (
                            <Button
                                key={item}
                                onClick={() => (item === "=" ? calculate() : handleClick(item))}
                                style={item === "=" ? equalsButtonStyle : buttonSize}
                            >
                                {item}
                            </Button>
                        ))}
                        <Button
                            onClick={() => handleClick("+")}
                            style={operatorButtonStyle}
                        >
                            +
                        </Button>
                    </Group>
                </Stack>

                {/* Clear Button */}
                <Button
                    color="red"
                    onClick={clear}
                    style={{
                        width: "100%",
                        height: buttonSize.height,
                        fontSize: buttonSize.fontSize,
                        marginTop: 12,
                    }}
                >
                    Clear
                </Button>

                {/* Divider */}
                <Divider my="sm" />
            </Paper>
        </div>
    );
};

export default Welcome;
