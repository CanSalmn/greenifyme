import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { w, h, m, p } from "../../../utils";
import Image from "../../Image";
import Button from "../../Button";

import EditIcon from "../../../assets/svg/EditIcon";
import TrashIcon from "../../../assets/svg/TrashIcon";
import IconButton from "../../IconButton";

interface ITaskCard {
    backgroundColor: string;
    color: string;
    taskTitle: string;
    taskNumber: number;
    onPressEdit: () => void;
    onPressTrash: () => void;
}

const TaskCard: React.FC<ITaskCard> = ({
    backgroundColor,
    color,
    taskTitle,
    taskNumber,
    onPressEdit,
    onPressTrash,
}) => {
    return (
        <View
            style={{
                height: h(80),
                width: w(110),
                marginLeft: m(10),
                backgroundColor: backgroundColor,
                borderRadius: 15,
                justifyContent: "space-between",
            }}
        >
            <Text
                style={{ color: color, margin: m(10), fontWeight: "400", fontSize: 16 }}
            >
                {taskTitle}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginBottom: m(10),
                }}
            >
                <Text style={{ color: color, fontWeight: "500", fontSize: 24 }}>
                    {taskNumber}
                </Text>
                <IconButton
                    SvgIcon={EditIcon}
                    iconColor={color}
                    onPress={onPressEdit}
                />
                <IconButton
                    SvgIcon={TrashIcon}
                    iconColor={color}
                    onPress={onPressTrash}
                />
            </View>
        </View>
    );
};

export default TaskCard;

const styles = StyleSheet.create({});
