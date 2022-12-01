import styles from './styles.module.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import { TbSubtask, TbPencil, TbX } from 'react-icons/tb';
import { IoMdDoneAll } from 'react-icons/io';


import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


function Home() {

    const [tasksTodo, setTasksTodo] = useState([])
    const [tasksDoing, setTasksDoing] = useState([])
    const [tasksDone, setTasksDone] = useState([])

    useEffect(() => {
        updateTasks()
    }, [])


    function updateTasks() {
        const taskList = localStorage.getItem('@tasks');

        const taskListJson = JSON.parse(taskList) || []

        let tasks1 = []
        let tasks2 = []
        let tasks3 = []

        for (let i = 0; i < taskListJson.length; i++) {
            // console.log(taskListJson[i])

            if (taskListJson[i].status == 'todo') {
                tasks1.push(taskListJson[i])
            } else if (taskListJson[i].status == 'doing') {
                tasks2.push(taskListJson[i])
            } else {
                tasks3.push(taskListJson[i])
            }
        }

        setTasksTodo(tasks1)
        setTasksDoing(tasks2)
        setTasksDone(tasks3)
    }

    function newTask() {

        newTask = document.getElementById('newTaskInput').value

        if(newTask.trim() === ''){
            return;
        }

        //acessando e guardando dados do local storage
        const taskList = JSON.parse(localStorage.getItem('@tasks')) || [];

        //verifica se o id do filme salvo é o mesmo dde algum que já esta salvo
        const hasTask = taskList.some((task) => task.name.toLowerCase() === newTask.toLowerCase());
        //se for entra aqui e para a execução
        if (hasTask) {
            toast.warn("Essa tarefa já existe!")
            return;
        }

        //se não coloca o array em filmesalvos, transforma em string com o stringify e adiciona ao localstorage
        taskList.push({ name: newTask.trim(), status: 'todo' })
        localStorage.setItem("@tasks", JSON.stringify(taskList))
        toast.success("Tarefa criada!")
        updateTasks()
        document.getElementById('newTaskInput').value = ''
    }


    function deleteTask(name) {
        const taskList = JSON.parse(localStorage.getItem('@tasks')) || [];

        let newTaskList = taskList.filter((task) => {
            return (task.name !== name)
        })

        localStorage.setItem("@tasks", JSON.stringify(newTaskList));
        toast.error("Tarefa deletada")
        updateTasks()
    }

    function changeStatusTask(name){
        const taskList = JSON.parse(localStorage.getItem('@tasks')) || [];

        //verifica se o id do filme salvo é o mesmo dde algum que já esta salvo
        const hasTask = taskList.some((task) => task.name.toLowerCase() === newTask.toLowerCase());
        console.log(hasTask)
       

    }


    return (
        <div className={styles.home}>
            <div>
                <h1>To Do List </h1>
                <h5>* Esse App usa localStorage, portanto ao mudar de navegador ou limpar os dados armazenados no navegador as tarefas serão perdidas!</h5>

            </div>


            <div className={styles.container}>
                <div className={styles.column}>
                    <h4> To do</h4>

                    <div className={styles.new_task}>
                        <input id="newTaskInput" />
                        <AiFillPlusCircle className={styles.plusicon} onClick={newTask} />
                    </div>
                    <div className={styles.cards}>

                        {tasksTodo.map(task => (
                            <div className={styles.card} key={task.name}>
                                <TbSubtask className={styles.taskicon} />
                                <div className={styles.task_desc}>
                                    {task.name}
                                </div>
                                <div className={styles.action_icons}>
                                    <TbPencil className={styles.icon} onClick={() => changeStatusTask(task.name) } />
                                    <IoMdDoneAll className={styles.icon} />
                                    <TbX className={styles.icon} onClick={() => { deleteTask(task.name) }} />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className={styles.column}>
                    <h4>Doing</h4>
                    <div className={styles.cards}>

                        {tasksDoing.map(task => (
                            <div className={styles.card} key={task.name}>
                                <TbPencil className={styles.taskicon} />
                                <div className={styles.task_desc}>
                                    {task.name}
                                </div>
                                <div className={styles.action_icons}>
                                    <TbSubtask className={styles.icon} />
                                    <IoMdDoneAll className={styles.icon} />
                                    <TbX className={styles.icon} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.column}>
                    <h4> Done</h4>
                    <div className={styles.cards}>

                        {tasksDone.map(task => (
                            <div className={styles.card} key={task.name}>
                                <IoMdDoneAll className={styles.taskicon} />
                                <div className={styles.task_desc}>
                                    {task.name}
                                </div>
                                <div className={styles.action_icons}>
                                    <TbSubtask className={styles.icon} />
                                    <TbPencil className={styles.icon} />
                                    <TbX className={styles.icon} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;