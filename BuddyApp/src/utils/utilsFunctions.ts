import { Alert } from "react-native"

export const commonError = (title?: string, text?: string, confirmHandlerFunction?: () => {}) => {
    const localTitle = title || 'Error';
    const localText = text || 'Sorry, something bad happened!';
    const confirmFunction = confirmHandlerFunction || (() => {});



    Alert.alert(localTitle, localText, [ {text: 'OK', onPress: () => confirmFunction}]);
}

