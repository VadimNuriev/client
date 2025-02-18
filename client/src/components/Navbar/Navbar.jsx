import React, { useState } from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import avatarLogo from '../../assets/img/avatar.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import {API_URL} from '../../config'

function Navbar() {

  const isAuth = useSelector(state => state.user.isAuth)
  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)
  const dispatch = useDispatch()
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

  function searchChangeHandler(event) {
    setSearchName(event.target.value)

    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }

    dispatch(showLoader())

    if (event.target.value !== '') {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value)) 
      }, 1000, event.target.value))
    } else {
      dispatch(getFiles(currentDir, 'type'))
    }
  }

  return (
    <div className='navbar'>
      <div className="container">
        <Link to='/'><img src={Logo} alt="logo" className="navbar_logo" /></Link>
        <div className="navbar_header">Sky Cloud</div>
        {isAuth && <input 
            value={searchName} 
            onChange={(event) => searchChangeHandler(event)}
            className="navbar_search form-control" 
            type="text" 
            placeholder="Поиск файла" />}
        {!isAuth && <div className="navbar_login"><Link to='/login'>Логин</Link></div>}
        {!isAuth && <div className="navbar_registration"><Link to='/registration'>Регистрация</Link></div>}
        {isAuth && <div className="navbar_login btn btn-link" onClick={() => dispatch(logout())}>Выход</div>}
        {isAuth && <Link to='/profile'><img src={avatar} alt="avatar" className="navbar_avatar" /></Link> }
      </div>
    </div>
  );
}

export default Navbar;
