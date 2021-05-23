import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback } from 'react-native';

export default function FrequentlyAskedQuestionView() {
    return <View>
        <Dropdown title="title">
            <Text>Hello</Text>
        </Dropdown>
    </View>
}

function Dropdown({title, children}) {
    const [isOpened, setOpened] = useState(false);
    return <View>
        <TouchableWithoutFeedback onPress={() => setOpened(!isOpened)}>
        <Text> 
            {title}
        </Text>
        </TouchableWithoutFeedback>
        {isOpened && children}
    </View>
}