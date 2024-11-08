import useQuestions from "../../app/Preguntas/useQuestions";

export const ChatAdmin = () => {
    const { userLoged } = useQuestions();
    return (
    <h1>Usuario logueado: {userLoged.name}</h1>
    );
}