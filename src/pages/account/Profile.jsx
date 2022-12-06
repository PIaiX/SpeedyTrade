import React, {useCallback} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Rating} from 'react-simple-star-rating'
import StarRating from '../../components/utils/StarRating'
import UserPhoto from '../../components/utils/UserPhoto'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import InputPassword from '../../components/utils/InputPassword'
import ProfileForm from '../../components/forms/ProfileForm'
import {useSelector} from 'react-redux'
import {getImageURL} from '../../helpers/image'
import {ReactComponent as ImStarEmpty} from 'react-icons/im'
import {ReactComponent as ImStarFull} from 'react-icons/im'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'

const Profile = () => {
    const user = useSelector((state) => state?.auth?.user)

    const onSubmit = useCallback((data) => {
        console.log('submitted', data)
    }, [])

    return (
        <div className="main">
            <div className="d-flex align-items-center mb-4">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Профиль</h4>
            </div>
            <Row className="flex-lg-row-reverse">
                <Col xs={12} xl={4}>
                    <div className="d-flex flex-column flex-sm-row flex-xl-column align-items-center mb-4 mb-xl-0">
                        <UserPhoto imgUrl={getImageURL(user?.avatar)} name={user?.fullName} />
                        <div className="d-flex flex-column align-items-center align-items-sm-start align-items-xl-center justify-content-center">
                            <h4 className="color-1 mt-3 mt-sm-0 mb-2 mb-sm-4">{user?.fullName}</h4>
                            <StarRating initialValue={4.35} size={24} allowFraction readonly />
                            <div className="mt-2 mt-sm-4">На сайте с {user?.createdAtForUser}</div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} xl={8}>
                    <ProfileForm onSubmit={onSubmit} />

                    <ChangePasswordForm />
                </Col>
            </Row>
        </div>
    )
}

export default Profile
