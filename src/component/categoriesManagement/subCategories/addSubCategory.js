import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Reinput from 'reinput';
import {Header} from 'native-base';



const addSubCategory = ({ navigation }) => {

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [photoData, setPhotoData] = useState('');
  const [categoryName, setCategoryName] = useState('');


  useEffect(() => {
    setCategoryName(navigation.getParam('categoryName'))
  })

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

  const handleAddCategory = () => {

    const url = "http://algosys-001-site8.ctempurl.com/api/SubCategories/AddSubCategory";
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
        FK_Category_ID: navigation.getParam('subCategoryID')
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

    //navigation.navigate('categoriesManagement')
  }




  const picture = photo;
  return (
    <View style={{ flex: 1 }}>
      <Header style={{ backgroundColor: '#522b59', justifyContent: 'flex-start', elevation: 10 }}>
        <TouchableOpacity
          style={{ margin: 15, width: 40, height: 40, borderRadius: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name='md-arrow-back' size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'OpenSans', color: '#fff' }}>اضافه</Text>
      </Header>
     

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, }}>
            <Text style={{ fontFamily: 'OpenSans', fontSize: 16, color: 'green' }}>انت تضيف بداخل قسم ال{categoryName}</Text>
          </View>

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
              onChangeText={(name) => setName(name)}
              fontSize={17}
              label='Name'
              placeholder='ادخل اسم القسم الفرعي'
              style={styles.NameInput}
            />
            <Reinput
              onChangeText={(desc) => setDesc(desc)}
              fontSize={17}
              label='Description'
              placeholder='ادخل وصف القسم الفرعي'
              style={styles.NameInput} />
          </View>
          <TouchableOpacity
            onPress={handleAddCategory}
            style={styles.addSubCategory}>
            <Text style={styles.saveText}>اضافه</Text>
          </TouchableOpacity>


        </View >
        <View style={{ paddingVertical: 10 }}></View>
      </KeyboardAwareScrollView>
    </View>

  );

}

const styles = StyleSheet.create({
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

export default addSubCategory;
