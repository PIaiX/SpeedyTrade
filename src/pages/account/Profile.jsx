import React, { useCallback } from 'react'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import ProfileForm from '../../components/forms/ProfileForm'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'

const Profile = () => {
    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Профиль</h4>
            </div>
            <Row>
                <ProfileForm />
                <ChangePasswordForm />
            </Row>
        </div>
    )
}

export default Profile
