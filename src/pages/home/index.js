import styles from './styles.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbSubtask, TbPencil, TbX } from 'react-icons/tb';
import { IoMdDoneAll } from 'react-icons/io';


import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from '../../components/footer';


function Home() {

    const [tasksTodo, setTasksTodo] = useState([]);
    const [tasksDoing, setTasksDoing] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);
    const [newTask, setNewTask] = useState([]);

    const [column1, setColumn1] = useState('to do');
    const [column2, setColumn2] = useState('doing');
    const [column3, setColumn3] = useState('done')

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

            if (taskListJson[i].status === 'todo') {
                tasks1.push(taskListJson[i])
            } else if (taskListJson[i].status === 'doing') {
                tasks2.push(taskListJson[i])
            } else {
                tasks3.push(taskListJson[i])
            }
        }

        setTasksTodo(tasks1)
        setTasksDoing(tasks2)
        setTasksDone(tasks3)
    }

    function addNewTask() {


        if (newTask.trim() === '') {
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
        setNewTask('')
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

    function changeStatusTask(name, status) {
        const taskList = JSON.parse(localStorage.getItem('@tasks')) || [];

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].name === name) {
                taskList[i].status = status
            }
        }
        localStorage.setItem("@tasks", JSON.stringify(taskList))
        toast.success("Status Atualizado!")
        updateTasks()
    }

    return (
        <div className={styles.home}>
            <div>
                <h1>To Do List </h1>
                <h5>* Esse App usa localStorage, portanto ao mudar de navegador ou limpar os dados armazenados no navegador as tarefas serão perdidas!</h5>

            </div>


            <div className={styles.container}>
                <div className={styles.column}>
                    <h4>
                        <TbSubtask className={styles.icon} />
                        {column1}
                    </h4>

                    <div className={styles.new_task}>
                        <input id="newTaskInput"
                            placeholder='Tarefas....'
                            value={newTask}
                            onChange={(e) => { setNewTask(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addNewTask()
                                }
                            }}
                        />
                        <div className={styles.containericon} onClick={addNewTask}>
                            <AiOutlinePlus className={styles.plusicon} />
                        </div>
                    </div>
                    <div className={styles.cards}>

                        {tasksTodo.map(task => (
                            <div className={styles.card} key={task.name}>
                                <TbSubtask className={styles.taskicon} />
                                <div className={styles.task_desc}>
                                    {task.name}
                                </div>
                                <div className={styles.action_icons}>
                                    <TbPencil className={styles.icon} onClick={() => changeStatusTask(task.name, 'doing')} />
                                    <IoMdDoneAll className={styles.icon} onClick={() => changeStatusTask(task.name, 'done')} />
                                    <TbX className={styles.icon} onClick={() => { deleteTask(task.name) }} />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className={styles.column}>
                    <h4>
                        <TbPencil className={styles.icon} />
                        {column2}
                    </h4>
                    <div className={styles.cards}>

                        {tasksDoing.map(task => (
                            <div className={styles.card} key={task.name}>
                                <TbPencil className={styles.taskicon} />
                                <div className={styles.task_desc}>
                                    {task.name}
                                </div>
                                <div className={styles.action_icons}>
                                    <TbSubtask className={styles.icon} onClick={() => changeStatusTask(task.name, 'todo')} />
                                    <IoMdDoneAll className={styles.icon} onClick={() => changeStatusTask(task.name, 'done')} />
                                    <TbX className={styles.icon} onClick={() => { deleteTask(task.name) }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.column}>
                    <h4>
                        <IoMdDoneAll className={styles.icon} />
                        {column3}
                    </h4>
                    <div className={styles.cards}>

                        {tasksDone.map(task => (
                            <div className={styles.card} key={task.name}>
                                <IoMdDoneAll className={styles.taskicon} />
                                <div className={styles.task_desc}>
                                    {task.name}
                                </div>
                                <div className={styles.action_icons}>
                                    <TbSubtask className={styles.icon} onClick={() => changeStatusTask(task.name, 'todo')} />
                                    <TbPencil className={styles.icon} onClick={() => changeStatusTask(task.name, 'doing')} />
                                    <TbX className={styles.icon} onClick={() => { deleteTask(task.name) }} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home;