"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const goToUsers = () => {
		router.push("/users");
	}

	const goToProfiles = () => {
		router.push("/profiles");
	}
	return (
		<div className="flex flex-col bg-white h-screen w-full justify-between p-6">
			<div className="flex items-center w-full gap-4 justify-center">
				<Image
					src="/images/mid.png"
					alt="Mid Logo"
					width={200}
					height={50}
				/>
				<Image
					src="/images/falconi.png"
					alt="Falconi Logo"
					width={300}
					height={80}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold text-gray-950 text-center">
					Desafio Técnico Fullstack
				</h1>
				<h2 className="text-xl text-gray-800 text-center">
					Desenvolvido por Amanda Vitor Lopes
				</h2>
			</div>
			<div className="flex items-center gap-4 justify-center">
				<button
					onClick={goToUsers}
					className="bg-rose-950 text-white p-2 w-fit rounded-lg cursor-pointer"
				>
					Usuários
				</button>
				<button
					onClick={goToProfiles}
					className="bg-yellow-800 text-white p-2 w-fit rounded-lg cursor-pointer"
				>
					Perfis
				</button>

			</div>
		</div>
	);
}
