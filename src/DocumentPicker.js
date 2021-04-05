import DocumentPicker from 'react-native-document-picker'


const PickSingleFile = async() => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log(
            res.uri,
            res.type,
            res.name,
            res.size
        );
        return res;
    } catch (error) {
        if (DocumentPicker.isCancel(error)){
            console.log("User cancel file pick")
            return null;
        }else {
            throw error;
        }
    }
};
const PickMultipleFile = async() => {
    try {
        const results = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.allFiles],
        });
        for (const res of results) {
            console.log(
                res.uri,
                res.type,
                res.name,
                res.size
            );
        }
        return results;
    } catch (error) {

        if (DocumentPicker.isCancel(error)){ 
            //alert('Canceled from multiple doc picker');
            console.log("User cancel file pick");
            return [];
        }else {
            alert('Unknown Error: ' + JSON.stringify(error));
            throw error;
            return [];
        }
    }
};

export { PickSingleFile,PickMultipleFile };