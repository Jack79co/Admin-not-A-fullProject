import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Right } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Reinput from 'reinput'


const subCategories = ({ navigation }) => {
    const [subCategories, setSubCategories] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [subCategoryID, setSubCategoryID] = useState()
    const [subCategoryName, setSubCategoryName] = useState('');
    const [subCategoryDesc, setSubCategoryDesc] = useState('');
    const [categoryID, setCategoryID] = useState()
    const [subCategoryImage, setSubCategoryImage] = useState('')

    const [modalVisible, setModalVisable] = useState(false);
    const [photoData, setPhotoData] = useState('');
    const [photo, setPhoto] = useState(null);
    
    const [again,setAgain] = useState(false)


    useEffect(() => {

        const url = "http://algosys-001-site8.ctempurl.com/api/SubCategories/GetAllSubCategories/" + navigation.getParam('categoryID');
        var tokn = 'Bearer z6GgTzDiCl_Cd0xuThfcf3I-J5nAqMFf0GMZQ3oknn43qPV7FP9m2UjGhK9N47BaGqgk-aajm9tMC6ukGFyf2os_KhtsB_xvjaFrssHU28jeTpGyvMv2aYlaO_RDd8QHJgZ0vBlWUMbb1db47_8NK_rYVqbdQ4rwh_02aL3hjjzWLnYnqUBY9iuxP8yi8JOsnA-HsOXxtgARCtSP6bNN8xQAEl4CPFEMebsWtpbFHWmH_6qlr4X9Ws5erVvr68HY763cfGtfux9_vASmmDtZIb9irnS9QiSQh8vojg76kHc7YAiKHHq9hmVNE4bsdwn-6EPdlVuxtAQQz0oevp1yqyVz5cYWnJzL1tUrIpEirPhwCu1Sftw2OQtHI-qm7yfckgz3uwRbKlLqjQx0udG8xeFWz5szkxetgEl4kO7Ws3O7nI55MBo65V9kWLbTPj3mnbaP9mt4gTSqucd63EY5EiN2q8SvHnmDaHhZzAT1eJyYwvKTwIV3If-6sonQTn3pdVZB91R1DHkeeTi9eY-MbA';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': tokn,
                "Content-Type": "application/json"
            },

        })
            .then((response) => response.json())
            .then((responseJson) => {
                setSubCategories(responseJson)
                setLoading(false)
            })

            .catch(error => {
                console.error(error);
            });
            setAgain(false)
            setPhoto(null)

    }, [again])



    // *********delete subCategory***********//
    const handleDeleteSubCategory = (id) => {
        var objects = subCategories.filter(item => item.PK_SubCategory_ID !== id);
        setSubCategories(objects);
        const url = "http://algosys-001-site8.ctempurl.com/api/SubCategories/DeleteSubCategory/" + id;
        var tokn = 'Bearer z6GgTzDiCl_Cd0xuThfcf3I-J5nAqMFf0GMZQ3oknn43qPV7FP9m2UjGhK9N47BaGqgk-aajm9tMC6ukGFyf2os_KhtsB_xvjaFrssHU28jeTpGyvMv2aYlaO_RDd8QHJgZ0vBlWUMbb1db47_8NK_rYVqbdQ4rwh_02aL3hjjzWLnYnqUBY9iuxP8yi8JOsnA-HsOXxtgARCtSP6bNN8xQAEl4CPFEMebsWtpbFHWmH_6qlr4X9Ws5erVvr68HY763cfGtfux9_vASmmDtZIb9irnS9QiSQh8vojg76kHc7YAiKHHq9hmVNE4bsdwn-6EPdlVuxtAQQz0oevp1yqyVz5cYWnJzL1tUrIpEirPhwCu1Sftw2OQtHI-qm7yfckgz3uwRbKlLqjQx0udG8xeFWz5szkxetgEl4kO7Ws3O7nI55MBo65V9kWLbTPj3mnbaP9mt4gTSqucd63EY5EiN2q8SvHnmDaHhZzAT1eJyYwvKTwIV3If-6sonQTn3pdVZB91R1DHkeeTi9eY-MbA';
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': tokn,
                "Content-Type": "application/json"
            },

        })
    }


    //********edit sub category******** //

    const handleEditSubCategory = (subCategoryID, name, desc, image, categoryID) => {
        const url = "http://algosys-001-site8.ctempurl.com/api/SubCategories/EditeSubCategory/" + subCategoryID;
        var tokn = 'Bearer z6GgTzDiCl_Cd0xuThfcf3I-J5nAqMFf0GMZQ3oknn43qPV7FP9m2UjGhK9N47BaGqgk-aajm9tMC6ukGFyf2os_KhtsB_xvjaFrssHU28jeTpGyvMv2aYlaO_RDd8QHJgZ0vBlWUMbb1db47_8NK_rYVqbdQ4rwh_02aL3hjjzWLnYnqUBY9iuxP8yi8JOsnA-HsOXxtgARCtSP6bNN8xQAEl4CPFEMebsWtpbFHWmH_6qlr4X9Ws5erVvr68HY763cfGtfux9_vASmmDtZIb9irnS9QiSQh8vojg76kHc7YAiKHHq9hmVNE4bsdwn-6EPdlVuxtAQQz0oevp1yqyVz5cYWnJzL1tUrIpEirPhwCu1Sftw2OQtHI-qm7yfckgz3uwRbKlLqjQx0udG8xeFWz5szkxetgEl4kO7Ws3O7nI55MBo65V9kWLbTPj3mnbaP9mt4gTSqucd63EY5EiN2q8SvHnmDaHhZzAT1eJyYwvKTwIV3If-6sonQTn3pdVZB91R1DHkeeTi9eY-MbA';
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': tokn,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                SubCategory_Name: name,
                SubCategory_Description: desc,
                SubCategory_Image: photoData,
                FK_Category_ID: categoryID
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData)

                )
            })
            .catch((error) => {
                console.error(error);
            });
        setModalVisable(false)
        setAgain(true)
        

    };

    const handleChoosePicture = () => {
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response', response)
            if (response.uri) {
                setPhoto(response)
                setPhotoData(response.data)
            }

        });
    };



    if (Loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#BA55D3" />
            </View>
        )
    }
    const picture = photo;
    return (
        <Container style={{ backgroundColor: '#e6e6e6' }}>
            <Header style={styles.HeaderWrapper}>
                <TouchableOpacity
                    style={styles.backBtnWrapper}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='md-arrow-back' size={30} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{navigation.getParam('categoryName')}</Text>
            </Header>

            <Content style={styles.contentStyle} showsVerticalScrollIndicator={false}>
                <FlatList
                    style={{ marginBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 20 }}
                    data={subCategories}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => {
                        return (

                            <View style={styles.categoriesManagementWrapper}>
                                <View style={styles.flatListSecondWrapper}>
                                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => handleDeleteSubCategory(item.PK_SubCategory_ID)}>
                                        <Icon size={25} name='md-close' color='red' />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setModalVisable(true)
                                        setSubCategoryName(item.SubCategory_Name)
                                        setSubCategoryDesc(item.SubCategory_Description)
                                        setSubCategoryID(item.PK_SubCategory_ID)
                                        setCategoryID(item.FK_Category_ID)
                                        setSubCategoryImage(item.SubCategory_Image)
                                    }}>
                                        <Icon size={25} name='md-create' color='gray' />
                                    </TouchableOpacity>

                                    <View style={{ width: 120, marginLeft: 20 }}>
                                        <Text style={{ marginBottom: 10, fontFamily: 'OpenSans', fontSize: 15 }}>{item.SubCategory_Name}</Text>
                                        <Text>{item.SubCategory_Description}</Text>
                                    </View>
                                </View>
                                <Image style={styles.subCategoryImage}
                                    source={{ uri: 'http://algosys-001-site8.ctempurl.com/Images/SubCategories/' + item.SubCategory_Image }} />

                            </View>


                        )
                    }
                    }
                />
            </Content>
            <TouchableOpacity
                onPress={() => navigation.navigate('addSubCategory', { subCategoryID: navigation.getParam('categoryID'), categoryName: navigation.getParam('categoryName') })}
                style={styles.FloatingButtonWrapper}>
                <Icon size={25} color='#fff' name='md-add' />
            </TouchableOpacity>

            {/* *********************************** moadal of editing *********************************** */}
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisable(false)}>

                <View style={{flex:1}}>
                    <Header style={{ backgroundColor: '#522b59', justifyContent: 'flex-start', elevation: 10 }}>
                        <TouchableOpacity
                            style={{ margin: 15, width: 40, height: 40, borderRadius: 20 }}
                            onPress={() => setModalVisable(false)}
                        >
                            <Icon name='md-arrow-back' size={30} color='#fff' />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'OpenSans', color: '#fff' }}>تعديل</Text>
                    </Header>

                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                        <View style={styles.container}>

                            <View style={styles.backgroundAreaOfProfile}>
                                <Text style={styles.putPicture}>ادخل صوره القسم الفرعي</Text>
                                {picture ? picture && (
                                    <TouchableWithoutFeedback>
                                        <Image source={{ uri: photo.uri }}
                                            style={styles.profileImage} />
                                    </TouchableWithoutFeedback>
                                    // --------------if there is no picture-------------------
                                )
                                    : <TouchableWithoutFeedback onPress={handleChoosePicture}>
                                        <View style={styles.profileImageBefore}></View>

                                    </TouchableWithoutFeedback>}
                            </View>

                            <View>
                                <Reinput
                                    onChangeText={(name) => setSubCategoryName(name)}
                                    fontSize={17}
                                    label='Name'
                                    placeholder='ادخل اسم القسم الفرعي'
                                    style={styles.NameInput}
                                />
                                <Reinput
                                    onChangeText={(desc) => setSubCategoryDesc(desc)}
                                    fontSize={17}
                                    label='Description'
                                    placeholder='ادخل وصف القسم الفرعي'
                                    style={styles.NameInput} />
                            </View>
                            <TouchableOpacity
                                onPress={() => handleEditSubCategory(
                                    subCategoryID,
                                    subCategoryName,
                                    subCategoryDesc,
                                    subCategoryImage,
                                    categoryID
                                )}
                                style={styles.addSubCategory}>
                                <Text style={styles.saveText}>تعديل</Text>
                            </TouchableOpacity>


                        </View >
                        <View style={{ paddingVertical: 10 }}></View>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>

        </Container>
    );
}

const styles = StyleSheet.create({
    HeaderWrapper: {
        backgroundColor: '#522b59',
        justifyContent: 'flex-start',
        elevation: 10
    },
    backBtnWrapper: {
        margin: 15,
        width: 40,
        height: 40,
        borderRadius: 20
    },
    headerTitle: {
        fontSize: 18,
        alignSelf: 'center',
        fontFamily: 'OpenSans',
        color: '#fff'
    },
    contentStyle: {
        paddingTop: 20,
    },
    flatListSecondWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        justifyContent: 'space-evenly'
    },
    categoriesManagementWrapper: {
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        elevation: 4,
        marginBottom: 10,
    },
    subCategoryImage: {
        flex: 1,
        width: 13,
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10,
        paddingLeft: 10,
    },
    FloatingButtonWrapper: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    // ***********************************modal style*****************************************/
    container: {
        flex: 1,
        padding: 30,
    },
    backgroundAreaOfProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        marginBottom: 20
    },
    profileImage: {
        width: 120,
        height: 140,
    },
    profileImageBefore: {
        width: 120,
        height: 140,
        backgroundColor: 'lightgray'
    },
    NameInput: {
        fontSize: 16
    },
    putPicture: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        paddingBottom: 30
    },
    addSubCategory: {
        backgroundColor: '#33cc33',
        borderRadius: 10,
        padding: 10,
        marginLeft: 70,
        marginRight: 70,
        justifyContent: 'center',
        marginTop: 30,
    },
    saveText: {
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'OpenSans',
        fontSize: 18
    },
})

export default subCategories;
