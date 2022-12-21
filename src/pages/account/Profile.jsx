import React, {useCallback} from 'react'
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import ProfileForm from '../../components/forms/ProfileForm'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'
import {userUpdateProfile} from '../../services/user'
import {useSelector} from 'react-redux'

const Profile = () => {
    const user = useSelector((state) => state?.auth?.user)

    const onSubmit = useCallback(
        (data) => {
            const formData = new FormData()
            for (const key in data) formData.append(key, data[key])

            userUpdateProfile(formData, user?.id)
                .then(() => console.log('success'))
                .catch(() => console.log('rejected'))
        },
        [user?.id]
    )

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Профиль</h4>
            </div>
            <Row>
                <ProfileForm onSubmit={onSubmit} />
                <ChangePasswordForm />
            </Row>
        </div>
    )
}

export default Profile
