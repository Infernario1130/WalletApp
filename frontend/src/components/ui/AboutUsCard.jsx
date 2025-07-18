import { Lock } from "lucide-react";


export function AboutUsCard({text1,text2,Icon}) {
    return(
        <div className="rounded-lg bg-white w-4/5 my-4 md:w-1/3">
            <div className="flex justify-around font-bold text-xl pt-6 px-2">
                {text1}
                <Icon className="rounded-full w-8 h-8 bg-violet-300"></Icon>
            </div>
            <div className="py-6 flex justify-center -ml-16 md:-mr-8">
                {text2}
            </div>
        </div>
    )
}