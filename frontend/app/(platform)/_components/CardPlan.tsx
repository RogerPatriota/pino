import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function CardPlan() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Plano Pro</CardTitle>
                <CardDescription className="text-zinc-500">Renovação em 23/02/2026</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Button  className="w-full p-5 hover:bg-teal-500 cursor-pointer">Gerenciar plano</Button>
            </CardContent>
        </Card>
    )
}

export default CardPlan