import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function CardPlan() {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Plano</CardTitle>
                    <Badge variant="outline" className="bg-teal-100 border-teal-500 text-teal-600 font-semibold">PRO</Badge>
                </div>
                <CardDescription className="text-zinc-500">Renovação em 23/02/2026</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Button  className="w-full p-4 hover:bg-teal-500 cursor-pointer">Gerenciar plano</Button>
            </CardContent>
        </Card>
    )
}

export default CardPlan