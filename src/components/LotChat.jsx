import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getImageURL } from "../helpers/image";
import { convertToLocaleDate } from "../helpers/convertToLocaleDate";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import useSocketConnect from "../hooks/socketConnect";
import { socketInstance } from "../services/sockets/socketInstance";
import {
  emitCreateMessage,
  emitPaginateMessages,
  emitViewedMessage,
  emitGetConversationWithUserId,
} from "../services/sockets/messages";

import InputFile from "../components/utils/InputFile";
import Dropdown from "react-bootstrap/Dropdown";
import {
  FiAlertTriangle,
  FiBell,
  FiMoreHorizontal,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroller";
import ValidateWrapper from "../components/UI/ValidateWrapper";
import ChatMessage from "./ChatMessage";

const LotChat = ({ lotUser }) => {
  const user = useSelector((state) => state?.auth?.user);
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  const { isConnected } = useSocketConnect();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [conversationId, setConversationId] = useState();
  const [conversation, setConversation] = useState();
  const [isFileSent, setIsFileSent] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      userId: lotUser.id,
      text: "",
      fromId: user?.id,
      lotId: id,
      attachedfile: "",
    },
  });

  const [messages, setMessages] = useState({
    isLoaded: false,
    items: [],
    meta: null,
  });

  useEffect(() => {
    if (isAuth && lotUser) {
      // Call getMessages when the component mounts
      getMessages();
    }
  }, []);

  useEffect(() => {
    const chatBody = document.getElementById("chatBody");
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);

  const setConvId = async () => {
    if (lotUser) {
      const res = await emitGetConversationWithUserId(lotUser.id);
      if (res.status === 200) {
        setConversation(res.body);
      }
      res.status === 200 ? setConversationId(res.body.id) : console.log(res);
      conversationId && setValue("conversationId", res.body.id);
    }
  };

  useEffect(() => {
    if (lotUser) {
      setConvId();
    }
  }, [lotUser]);

  const createMessage = async (data) => {
    try {
      const response = await emitCreateMessage(data);
      if (response !== null) {
        if (response.status === 200) {
          reset();
          const newMessage = response.body;
          // console.log(newMessage);

          const isMessageExist = messages.items.some(
            (message) => message.id === newMessage.id
          );

          if (!isMessageExist) {
            setMessages((prevMessages) => ({
              ...prevMessages,
              items: [...prevMessages.items, newMessage],
            }));
          }

          const chatBody = document.getElementById("chatBody");
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }
    } catch (err) {
      console.error("Ошибка при отправке сообщения:", err);
    }
  };

  const getMessages = () => {
    if (lotUser.id) {
      emitPaginateMessages(
        { userId: lotUser.id },
        { page: currentPage, limit: 10, orderBy: "desc" }
      )
        .then((res) => {
          // console.log(lotUser)
          if (res.status === 200) {
            setMessages({
              isLoaded: true,
              items: [...res.body.data.reverse(), ...messages.items],
              meta: res?.body?.meta,
            });
            setCurrentPage(currentPage + 1);
          }
        })
        .catch(() => setMessages({ isLoaded: true, items: null, meta: null }));
    }
  };

  useEffect(() => {
    if (isConnected && socketInstance) {
      socketInstance?.on("message:create", (newMessage) => {
        if (newMessage.conversationId === conversationId) {
          if (newMessage.fromId === user?.id) {
            setMessages((prevState) => ({
              ...prevState,
              items: prevState.items
                ? [...prevState.items, newMessage]
                : [newMessage],
            }));
          }
        }
      });

      socketInstance?.on("message:viewed", (viewedMessage) => {
        setMessages((prevState) => ({
          ...prevState,
          items: prevState.items
            ? prevState.items.map((item) =>
                item.id === viewedMessage.id
                  ? { ...item, ...viewedMessage }
                  : item
              )
            : prevState.items,
        }));
      });

      if (conversationId) {
        emitViewedMessage({ conversationId });
      }
    } else {
      console.error("Диалог не найден!");
    }

    return () => {
      socketInstance?.removeAllListeners();
    };
  }, [
    isConnected,
    conversationId,
    user,
    emitViewedMessage,
    socketInstance,
    messages,
  ]);

  // useEffect(() => {
  //   const chatBody = document.getElementById("chatBody");
  //   return () => {
  //     chatBody.scrollTop = chatBody.scrollHeight;
  //   };
  // });

  // useEffect(() => {
  //   let setConvId = async () => {
  //     if (lotUser) {
  //       let res = await emitGetConversationWithUserId(lotUser.id);
  //       if (res.status == 200) {
  //         setConversation(res.body);
  //       }
  //       res.status === 200 ? setConversationId(res.body.id) : console.log(res);
  //       conversationId && setValue("conversationId", res.body.id);
  //     }
  //   };
  //   setConvId();
  // }, [lotUser]);

  // useEffect(() => {
  //   if (isConnected && socketInstance) {
  //     socketInstance?.on("message:create", (newMessage) => {
  //       if (newMessage.conversationId === conversationId) {
  //         if (newMessage.fromId === user?.id) {
  //           setMessages((prevState) => ({
  //             ...prevState,
  //             items: prevState.items
  //               ? [...prevState.items, newMessage]
  //               : [newMessage],
  //           }));
  //         }
  //       }
  //     });

  //     socketInstance?.on("message:viewed", (viewedMessage) => {
  //       setMessages((prevState) => ({
  //         ...prevState,
  //         items: prevState.items
  //           ? prevState.items.map((item) =>
  //               item.id === viewedMessage.id
  //                 ? { ...item, ...viewedMessage }
  //                 : item
  //             )
  //           : prevState.items,
  //       }));
  //     });

  //     if (conversationId) {
  //       emitViewedMessage({ conversationId });
  //     }
  //   } else {
  //     console.error("Диалог не найден!");
  //   }

  //   return () => {
  //     socketInstance?.removeAllListeners();
  //   };
  // }, [
  //   isConnected,
  //   messages,
  //   conversationId,
  //   user,
  //   emitViewedMessage,
  //   socketInstance,
  // ]);

  // const createMessage = async (data) => {
  //   try {
  //     const response = await emitCreateMessage(data);
  //     if (response !== null) {
  //       if (response.status === 200) {
  //         reset();
  //         const newMessage = response.body;

  //         const isMessageExist = messages.items.some(
  //           (message) => message.id === newMessage.id
  //         );

  //         if (!isMessageExist) {
  //           setMessages((prevMessages) => ({
  //             ...prevMessages,
  //             items: [...prevMessages.items, newMessage],
  //           }));
  //         }

  //         const chatBody = document.getElementById("chatBody");
  //         chatBody.scrollTop = chatBody.scrollHeight;

  //         if (messages.items.length === 0) {
  //           // Если это первое сообщение, добавьте его в начало списка
  //           setMessages({ isLoaded: true, items: [newMessage], meta: null });
  //         }
  //       } else {
  //         console.error("Ошибка при отправке сообщения:", response);
  //       }
  //     } else {
  //       console.error("Ошибка при отправке сообщения: диалог не найден");
  //     }
  //   } catch (err) {
  //     console.error("Ошибка при отправке сообщения:", err);
  //   }
  // };

  // const getMessages = () => {
  //   if (lotUser.id) {
  //     emitPaginateMessages(
  //       { userId: lotUser.id },
  //       { page: currentPage, limit: 10, orderBy: "desc" }
  //     )
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setMessages({
  //             isLoaded: true,
  //             items: [...res.body.data.reverse(), ...messages.items],
  //             meta: res?.body?.meta,
  //           });
  //           setCurrentPage(currentPage + 1);
  //         }
  //       })
  //       .catch(() => setMessages({ isLoaded: true, items: null, meta: null }));
  //   }
  // };

  const groupBy = (arr, key) => {
    const initialValue = {};
    return arr?.reduce((acc, cval) => {
      const myAttribute = cval[key] && convertToLocaleDate(cval[key]);
      acc[myAttribute] = [...(acc[myAttribute] || []), cval];
      return acc;
    }, initialValue);
  };

  return (
    <>
      <div className="top">
        <Link to={`/user/${lotUser.id}`} className="d-flex align-items-center">
          <div className="img me-2 me-sm-3">
            <img src={getImageURL(lotUser.avatar)} alt={lotUser.fullName} />
            <div
              className={lotUser.isOnline ? "indicator unread" : "indicator"}
            ></div>
          </div>
          <div>
            <h5 className="achromat-2 mb-0 mb-sm-1">{lotUser.fullName}</h5>
            <div className="achromat-3 fs-09">
              {lotUser.isOnline
                ? "Онлайн"
                : "Был(а) онлайн " + lotUser.lastSeenForUser}
            </div>
          </div>
        </Link>
        {/* <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <FiMoreHorizontal className="fs-15" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">
                            <FiBell className="fs-13" />
                            <span className="ms-2">Включить оповещения</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <FiAlertTriangle className="fs-13" />
                            <span className="ms-2">Пожаловаться</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <FiTrash2 className="fs-13" />
                            <span className="ms-2">Удалить диалог</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
      </div>
      <div className="middle" id="chatBody">
        {isAuth ? (
          <div>
            {Object.entries(groupBy(messages?.items, "createdAt")).map(
              (key) => (
                <ChatMessage
                  // blockMessage={blockMessage}
                  key={key}
                  keyArr={key[0]}
                  arr={key[1]}
                  avatarUser={lotUser.avatar}
                />
              )
            )}

            {Object.entries(groupBy(messages?.items, "createdAt")).map((key) =>
              console.log(key)
            )}
          </div>
          // <InfiniteScroll
          //   loadMore={getMessages}
          //   isReverse={true}
          //   hasMore={
          //     messages?.items && messages.meta
          //       ? messages.meta.total > messages.items.length
          //       : true
          //   }
          //   threshold={100}
          //   useWindow={false}
          // >
          //   {Object.entries(groupBy(messages?.items, "createdAt")).map(
          //     (key) => (
          //       <ChatMessage
          //         // blockMessage={blockMessage}
          //         key={key}
          //         keyArr={key[0]}
          //         arr={key[1]}
          //         avatarUser={lotUser.avatar}
          //       />
          //     )
          //   )}

          //   {Object.entries(groupBy(messages?.items, "createdAt")).map((key) =>
          //     console.log(key)
          //   )}
          // </InfiniteScroll>
        ) : (
          
          <div>Чат доступен только авторизованным пользователям</div>
        )}
      </div>
      <form onSubmit={handleSubmit(createMessage)}>
        {conversation?.isBlockedForUser ? (
          <div>Пользователь запретил оправку сообщений.</div>
        ) : (
          <>
            <InputFile
              register={register("attachedfile")}
              isFileSent={isFileSent}
              setIsFileSent={setIsFileSent}
              disabled={!isAuth}
            />
            <ValidateWrapper error={errors?.text}>
              <input
                type="text"
                placeholder="Введите сообщение"
                {...register("text", {
                  required: "Минимум 1 знак",
                })}
                disabled={!isAuth}
              />
            </ValidateWrapper>

            <button type="submit" disabled={!isAuth}>
              <FiSend />
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default memo(LotChat);
