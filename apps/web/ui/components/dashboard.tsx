"use client";

import { getClientSideCookie } from "@lib/getCookie";
import { cn } from "@repo/common/cn";
import { HTTP_URL_V1 } from "@repo/common/config";
import Button from "@ui/button";
import Input from "@ui/input";
import RoomCard from "@ui/roomCard";
import setCookie from "actions/cookies";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface RoomType {
  roomName: string;
  adminId: string;
  createdAt: Date;
}

export default function DashBoard() {
  const username = useRef("");
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [joinRoomModal, setJoinRoomModal] = useState(false);
  const [createRoomModal, setCreateRoomModal] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const joinRoom = async () => {
    setIsLoading(true);
    try {
      const token = getClientSideCookie("token");
      const response = await axios.get(`${HTTP_URL_V1}/room/${roomName}`, {
        headers: {
          Authorization: token
        }
      });
      const data = response.data;
      await setCookie("roomId", data.roomId);
      router.push(`/canvas/${getClientSideCookie("roomId")}`);

    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const createRoom = async () => {
    try {
      const token = getClientSideCookie("token");
      const response = await axios.get(`${HTTP_URL_V1}/user/create-room`, {
        headers: {
          Authorization: token
        }
      });
      const data = response.data;
      await setCookie("roomId", data.roomId);
      alert(data.msg);
      router.push(`/canvas/${getClientSideCookie("roomId")}`);

    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  }

  const fetchRooms = async () => {
    const token = getClientSideCookie("token");

    type ResponseDataType = {
      userAsAdminInRooms: RoomType[]
    }

    try {
      const response = await axios.get(`${HTTP_URL_V1}/user/rooms-admin`, {
        headers: {
          Authorization: token
        }
      });
      const data: ResponseDataType = response.data;
      console.log(data);
      
      setRooms(data.userAsAdminInRooms);

    } catch (error) {
      
    }
  }

  useEffect(() => {
    username.current = getClientSideCookie("username")
    fetchRooms();
  }, [])

  return (
    <div className={cn(
      "w-screen h-screen p-0 m-0 flex flex-col bg-gradient-to-br from-pixora-950/90 via-pixora-950/85 to-pixora-950/90 backdrop-blur-xs"
    )}>
      <header className={cn(
        "h-1/6 flex justify-between border-b-2 border-b-pixora-100/30"
      )}>
        <div className="w-full h-full px-28 py-2 flex justify-between items-center">
          <div className={cn(
            "flex flex-col justify-center items-start text-white tracking-tight"
          )}>
            <p className="text-4xl font-bold">{username.current}</p>
            <p className="text-base font-normal opacity-70">welcome to your dashboard</p>
          </div>
          <div className={cn(
            "flex gap-2 justify-center items-center"
          )}>
            <Button className="hover:-translate-y-0.5 hover:shadow-md shadow-pixora-100" variant={"white"} size={"md"}
              onClick={() => {
                setJoinRoomModal(true);
              }}>
                Join Room
            </Button>
            <Button className="hover:-translate-y-0.5 hover:shadow-md shadow-pixora-800" variant={"secondary"} size={"md"}
              onClick={() => {
                setCreateRoomModal(true);
              }}>
                Create Room
            </Button>
          </div>
        </div>
      </header>

      <section className={cn(
        "h-5/6 w-full flex flex-wrap px-10 py-5"
      )}>
        {/* {
          rooms.map((room, index) => {
            return (
              <li key={index}>
                <RoomCard
                  index={index}
                  roomName={room.roomName}
                  adminId={room.adminId}
                  createdAt={room.createdAt}
                />
              </li>
            )
          })
        } */}
      </section>

      {
        joinRoomModal &&
        <Modal
          modalName={"Join Room"}
          setModal={setJoinRoomModal}
          action={joinRoom}
          roomName={roomName}
          setRoomName={setRoomName}
          isLoading={isLoading}
        />
      }

      {
        createRoomModal &&
        <Modal
          modalName={"Create Room"}
          setModal={setCreateRoomModal}
          action={createRoom}
          roomName={roomName}
          setRoomName={setRoomName}
          isLoading={isLoading}
        />
      }

    </div>
  )
}

interface ModalProps {
  modalName: string;
  setModal: Dispatch<SetStateAction<boolean>>;
  action: () => void;
  roomName: string;
  setRoomName: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const Modal = ({
  modalName,
  setModal,
  action,
  roomName,
  setRoomName,
  isLoading,
}: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModal(false);
      }
    })
  }, [])

  return (
    <div className={cn(
      "fixed inset-0 w-screen h-screen bg-pixora-950/80 flex justify-center items-center backdrop-blur-xs"
    )}>
      <div className={cn(
        "w-1/3 h-fit py-20 px-5 rounded-xl flex flex-col gap-5 items-center justify-center",
        "bg-gradient-to-br from-pixora-950/60 via-pixora-950/80 to-pixora-950/60 backdrop-blur-sm border-2 border-slate-700/30",
        "shadow-black/50"
      )}>
        <Input
          reference={inputRef}
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          labelClassName="text-slate-300"
          className="w-full"
          name="Room name"
          type="text"
          placeholder="room name"
          intent={"room"}
          size={"sm"}
        />
        <div className="flex justify-center items-center gap-3 w-full h-fit p-3">
          <Button variant={"white"} size={"md"} onClick={() => {
            setModal(false);
          }}>
            Cancel
          </Button>

          <Button disabled={!roomName.trim() || isLoading} variant={"secondary"} size={"md"} onClick={action}>
            <div className="flex gap-3 justify-center items-center w-full h-full">
              {
                isLoading && <Loader className="animate-spin" />
              }
              {modalName}
            </div>
          </Button>
        </div>
      </div>

    </div>
  )
}