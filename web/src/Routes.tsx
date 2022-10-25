// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import  MainLayout  from 'src/layouts/MainLayout/MainLayout';

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
      <Route path="/about" page={AboutPage} name="about" />
        <Route path="/user/{id:String}" page={UserPage} name="user" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/tweet/{id}" page={TweetPage} name="tweet" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
