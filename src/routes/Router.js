import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../NavPage/Home';
import Introduce from '../NavPage/Introduce';
import Contact from '../NavPage/Contact';

import Information from '../page/Information';
import ScientificArticle from '../page/ScientificArticle';
import ScientificResearchTopic from '../page/ScientificResearchTopic';
import ScientificResearchCouncil from '../page/ScientificResearchCouncil';
import Document from '../page/Document';
import ScientificReport from '../page/ScientificReport';
import ScientificResearchProduct from '../page/ScientificResearchProducts';
import Initiative from '../page/Initiative';
import Statistic from '../page/Statistics';
import MainPage from '../pages/MainPage';

import EditInformation from '../pages/EditInformation';
import AddScientificArt from '../pages/AddScientificArt';
import AddScientificResTpc from '../pages/AddScientificResTpc';
import AddSciResCou from '../pages/AddSciResCou';
import AddDocument from '../pages/AddDocument';
import AddScientificReport from '../pages/AddScientificReport';
import ScientificConferences from '../page/ScientificConferences';
import AddScientificCfs from '../pages/AddScientificCfs';
import AddScientificResPro from '../pages/AddScientificResPro';
import AddInitiative from '../pages/AddInitiative';
import EditDocument from '../pageEdit/EditDocument';
import EditInitiative from '../pageEdit/EditInitiative';
import EditScientificCfs from '../pageEdit/EditScientificCfs';
import EditScientificReport from '../pageEdit/EditScientificReport';
import EditScientificResPro from '../pageEdit/EditScientificResPro';
import EditSciResCou from '../pageEdit/EditSciResCou';
import EditScientificResTpc from '../pageEdit/EditScientificResTpc';
import EditScientificArt from '../pageEdit/EditScientificArt';
import Search from '../NavPage/Search';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';

const Router = () => {
  return (
    <Routes>
      {/* topnav */}
      <Route path='/home' element={<HomePage />} />
      <Route path='/search' element={<Search />} />
      <Route path='/introduce' element={<Introduce />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/' element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* page */}

      <Route path='/func' element={<MainPage />}>
        <Route path='/func/information' element={<Information />} />
        <Route path='/func/information/editInf/:userId' element={<EditInformation />} />
        <Route path='/func/scientificArticle' element={<ScientificArticle />} />
        <Route path='/func/scientificArticle/addSciArt' element={<AddScientificArt />} />
        <Route path='/func/scientificArticle/editSciArt/:artId' element={<EditScientificArt />} />
        <Route path='/func/scientificResearchTopic' element={<ScientificResearchTopic />} />
        <Route path='/func/scientificResearchTopic/addSciResTpc' element={<AddScientificResTpc />} />
        <Route path='/func/scientificResearchTopic/editSciResTpc/:tpcId' element={<EditScientificResTpc />} />
        <Route path='/func/scientificResearchCouncil' element={<ScientificResearchCouncil />} />
        <Route path='/func/scientificResearchCouncil/addSciResCou' element={<AddSciResCou />} />
        <Route path='/func/scientificResearchCouncil/editSciResCou/:couId' element={<EditSciResCou />} />
        <Route path='/func/document' element={<Document />} />
        <Route path='/func/document/addDocument' element={<AddDocument />} />
        <Route path='/func/document/editDocument/:docId' element={<EditDocument />} />
        <Route path='/func/scientificReport' element={<ScientificReport />} />
        <Route path='/func/scientificReport/addSciReport' element={<AddScientificReport />} />
        <Route path='/func/scientificReport/editSciReport/:repId' element={<EditScientificReport />} />
        <Route path='/func/scientificConferences' element={<ScientificConferences />} />
        <Route path='/func/scientificConferences/addScientificCfs' element={<AddScientificCfs />} />
        <Route path='/func/scientificConferences/editConferences/:cfsId' element={<EditScientificCfs />} />
        <Route path='/func/scientificResearchProduct' element={<ScientificResearchProduct />} />
        <Route path='/func/scientificResearchProduct/addScientificResPro' element={<AddScientificResPro />} />
        <Route path='/func/scientificResearchProduct/editProduct/:proId' element={<EditScientificResPro />} />
        <Route path='/func/initiative' element={<Initiative />} />
        <Route path='/func/initiative/addInitiative' element={<AddInitiative />} />
        <Route path='/func/initiative/editInitiative/:initId' element={<EditInitiative />} />
        <Route path='/func/statistic' element={<Statistic />} />
      </Route>
      {/* sidebar */}
    </Routes>
  );
}

export default Router;