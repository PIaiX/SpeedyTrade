import React, { useCallback, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ValidateWrapper from "../UI/ValidateWrapper";
import { useSelector, useDispatch } from "react-redux";
import UserPhoto from "../utils/UserPhoto";
import StarRating from "../utils/StarRating";
import { useImageViewer } from "../../hooks/imageViewer";
import { onImageHandler } from "../../helpers/formHandlers";
import { dispatchAlert } from "../../helpers/alert";
import { getImageURL } from "../../helpers/image";
import { userUpdateProfile } from "../../services/user";
import moment from "moment";
import { refreshAuth } from "../../store/actions/auth";

const ProfileForm = () => {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (data) => {
      const formData = new FormData();
      for (const key in data) formData.append(key, data[key]);

      userUpdateProfile(formData, user?.id)
        .then((res) => {
          dispatchAlert("success", "Данные успешно сохранены");
          dispatch(refreshAuth())
            .then((res) => {
              reset({
                firstName: res.payload.user.firstName,
                lastName: res.payload.user.lastName,
                nickname: res.payload.user.nickname,
                phone: res.payload.user.phone,
                sex: res.payload.user.sex.toString(),
                birthday:
                  moment(res.payload.user.birthday, "YYYY-MM-DD").format(
                    "DD.MM.YYYY"
                  ) ?? null,
                isSubscribed: res.payload.user.isSubscribed,
                // avatar: res.payload.user.avatar,
              });
            })
            .catch((e) => {
              dispatchAlert("danger", e.response.data.message);
            });
        })
        .catch((e) => {
          e.response.data.body.errors.map((error) =>
            setError(error.field, { type: "custom", message: error.message })
          );
        });
    },
    [user?.id]
  );

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    setError,
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onSubmit",
    defaultValues: {
      // firstName: user.firstName ?? '',
      // lastName: user.lastName ?? '',
      nickname: user.nickname ?? "",
      phone: user.phone ?? "",
      sex: user.sex?.toString() ?? "true",
      birthday:
        moment(user.birthday ?? new Date(), "YYYY-MM-DD").format(
          "DD.MM.YYYY"
        ) ?? null,
      isSubscribed: user.isSubscribed ?? false,
    },
  });

  const avatarImage = useImageViewer(watch("avatar"));

  const onChangeAvatar = useCallback((e) => {
    const result = onImageHandler(e, (file) =>
      setValue("avatar", file, { shouldDirty: true })
    );
    if (!result)
      dispatchAlert(
        "danger",
        "Фото должно быть в одном из форматов (png, jpg, jpeg) и не более 1Мб"
      );
  }, []);

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <Row className="flex-lg-row-reverse">
        <Col xs={12} xl={4}>
          <div className="d-flex flex-column flex-sm-row flex-xl-column align-items-center mb-4 mb-xl-0">
            <UserPhoto
              imgUrl={
                avatarImage ? avatarImage?.data_url : getImageURL(user?.avatar)
              }
              name={user?.fullName}
              onChange={onChangeAvatar}
              onDelete={() => setValue("avatar", null)}
            />
            <div className="d-flex flex-column align-items-center align-items-sm-start align-items-xl-center justify-content-center">
              <StarRating
                className="justify-content-start justify-content-xl-center"
                rate={user?.rating}
              />
              <div className="mt-2 mt-sm-4">
                На сайте с {user?.createdAtForUser}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} xl={8}>
          <Row className="g-3 g-xl-4 align-items-center">
            <Col md={3}>
              <div>Ник:</div>
            </Col>
            <Col md={9}>
              <ValidateWrapper error={errors?.nickname}>
                <input
                  disabled
                  type="text"
                  placeholder="Ник"
                  {...register("nickname", { required: "Заполните поле" })}
                />
              </ValidateWrapper>
            </Col>
            {/*<Col md={3}>*/}
            {/*    <div>Пол:</div>*/}
            {/*</Col>*/}
            {/*<Col md={9} className="d-flex">*/}
            {/*    <label className="c-pointer">*/}
            {/*        <input*/}
            {/*            className="c-pointer"*/}
            {/*            type="radio"*/}
            {/*            {...register('sex', { required: true })}*/}
            {/*            value="true"*/}
            {/*        />*/}
            {/*        <span>Женский</span>*/}
            {/*    </label>*/}
            {/*    <label className="ms-4 c-pointer">*/}
            {/*        <input*/}
            {/*            className="c-pointer"*/}
            {/*            type="radio"*/}
            {/*            {...register('sex', { required: true })}*/}
            {/*            value="false"*/}
            {/*        />*/}
            {/*        <span>Мужской</span>*/}
            {/*    </label>*/}
            {/*</Col>*/}
            {/*<Col md={3}>*/}
            {/*    <div>Дата рождения:</div>*/}
            {/*</Col>*/}
            {/*<Col md={9} className="d-sm-flex">*/}
            {/*    <ValidateWrapper error={errors?.birthday} className="w-100">*/}
            {/*        <Controller*/}
            {/*            name="birthday"*/}
            {/*            control={control}*/}
            {/*            render={({ field }) => (*/}
            {/*                <DatePicker*/}
            {/*                    selected={new Date(moment(watch('birthday'), 'DD.MM.YYYY').format())}*/}
            {/*                    onChange={(date) => field.onChange(moment(date).format('DD.MM.YYYY'))}*/}
            {/*                    peekNextMonth*/}
            {/*                    showMonthDropdown*/}
            {/*                    showYearDropdown*/}
            {/*                    dropdownMode="select"*/}
            {/*                    dateFormat="dd-MM-yyyy"*/}
            {/*                />*/}
            {/*            )}*/}
            {/*            rules={{ required: 'Заполните поле' }}*/}
            {/*        />*/}
            {/*    </ValidateWrapper>*/}
            {/*</Col>*/}
            {/*<Col md={3}>*/}
            {/*    <div>Телефон:</div>*/}
            {/*</Col>*/}
            {/*<Col md={9}>*/}
            {/*    <ValidateWrapper error={errors?.phone}>*/}
            {/*        <Controller*/}
            {/*            name="phone"*/}
            {/*            control={control}*/}
            {/*            render={({ field }) => (*/}
            {/*                <PhoneInput*/}
            {/*                    required={false}*/}
            {/*                    inputClass="phone-input"*/}
            {/*                    country={'ru'}*/}
            {/*                    placeholder="Номер телефона"*/}
            {/*                    specialLabel={null}*/}
            {/*                    value={getValues('phone')}*/}
            {/*                    onChange={(phone) => field.onChange(`${phone}`)}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*        />*/}
            {/*    </ValidateWrapper>*/}
            {/*</Col>*/}
            <Col md={3}>
              <div>Email:</div>
            </Col>
            <Col md={9}>
              <ValidateWrapper error={errors?.email}>
                <input
                  type="email"
                  placeholder="email@email.com"
                  value={user?.email}
                  disabled
                />
              </ValidateWrapper>
            </Col>
            {/*<Col md={{ span: 9, offset: 3 }}>*/}
            {/*    <label className="c-pointer">*/}
            {/*        <input type="checkbox" {...register('isSubscribed')} className="c-pointer" />*/}
            {/*        <span>Получать уведомления на почту</span>*/}
            {/*    </label>*/}
            {/*</Col>*/}
            <div className="d-flex mt-4">
              <button
                type="submit"
                className="btn-5"
                disabled={!isDirty || !isValid}
              >
                Сохранить изменения
              </button>
              <button
                type="button"
                className="btn-1 ms-2 ms-sm-4"
                disabled={!isDirty}
                onClick={() => reset()}
              >
                Отмена
              </button>
            </div>
          </Row>
        </Col>
      </Row>
    </form>
  );
};

export default ProfileForm;
