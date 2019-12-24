import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './src/component/Main/Main';
import categoriesManagement from './src/component/categoriesManagement/categoriesManagement';
import subCategories from './src/component/categoriesManagement/subCategories/subCategories';
import addSubCategory from './src/component/categoriesManagement/subCategories/addSubCategory';
import getItems from './src/component/itemsManagement/getItems';


const MainNavigator = createStackNavigator({
  Main: { screen: Main },
  categoriesManagement: { screen: categoriesManagement },
  subCategories: { screen: subCategories },
  addSubCategory : {screen :addSubCategory},
  getItems : { screen: getItems }
}, {
  headerMode: 'none',
});

const App = createAppContainer(MainNavigator);

export default App;