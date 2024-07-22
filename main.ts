#! /usr/bin/env node

import inquirer from "inquirer"

class student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;

    }

    enroll_course(course: string) {
        this.courses.push(course)
    }
    view_balance() {
        console.log(`Balance for ${this.name} : ${this.balance}`)
    }

    pay_fee(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} paid successfully for ${this.name}`)
    }

    show_status() {
        console.log(`ID: ${this.id}`)
        console.log(`Name: ${this.name}`)
        console.log(`Courses: ${this.courses}`)
        console.log(`Balance${this.balance}`)
    }
}
class Manager {
    studentArray: student[];

    constructor() {
        this.studentArray = []
    }
    add_student(name: string) {
        let studentName = new student(name);
        this.studentArray.push(studentName);
        console.log(`Student: ${name} added successfully. Student ID: ${studentName.id}`);
    }

    enroll_student(student_id: number, course: string) {
        let find_student = this.student_find_method(student_id);
        if (find_student) {
            find_student.enroll_course(course)
            console.log(`${find_student.name} enrolled in ${course} successfully `)
        }
    }
    view_student_balance(student_id: number) {
        let find_student2 = this.studentArray.find(std => std.id === student_id)
        if (find_student2) {
            find_student2.view_balance()
        } else {
            console.log("student not found. please enter a correct student ID.")
        }
    }

    pay_student_fee(student_id: number, amount: number) {
        let find_student3 = this.student_find_method(student_id);
        if (find_student3) {
            find_student3.pay_fee(amount)
        } else {
            console.log("student not found. please enter a correct student ID.")
        }
    }

    show_student_status(student_id: number) {
        let find_student4 = this.student_find_method(student_id);
        if (find_student4) {
            find_student4.show_status()
        }
    }

    student_find_method(student_id: number) {
        return this.studentArray.find(std => std.id === student_id)
    }
}

async function main() {
    console.log("welcome to my channel 'CodeWithMoiz' - Student management system")
    console.log("-".repeat(50))
    let student_manager = new Manager();

    while (true) {
        let Asking = await inquirer.prompt(
            [
                {
                    name: "function",
                    type: "list",
                    message: "please select option",
                    choices:
                        [
                            "Add Student",
                            "Enroll Student",
                            "View Student Balance",
                            "Pay Fees",
                            "Show Status",
                            "Exit"
                        ]
                }
            ]
        )

        switch (Asking.function) {
            case "Add Student":
                let input_name = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name"
                    }
                ]);
                student_manager.add_student(input_name.name);
                break;

            case "Enroll Student":
                let input_course = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "input",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name"
                    }
                ]);
                student_manager.enroll_student(parseInt(input_course.Student_id), input_course.course);
                break;

            case "View Student Balance":
                let check_balance = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "input",
                        message: "Enter a Student ID"
                    }
                ]);
                student_manager.view_student_balance(parseInt(check_balance.student_id));
                break;

            case "Pay Fees":
                let input_fees = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "input",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter a amount to pay"
                    }
                ]);
                student_manager.pay_student_fee(parseInt(input_fees.student_id),parseFloat( input_fees.amount));
                break;

            case "Show Status":
                let input_status = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "input",
                        message: "Enter a Student ID"
                    }
                ]);
                student_manager.show_student_status(parseInt(input_status.student_id));
                break;

            case "Exit":
                console.log("Exiting... ");
                process.exit();
        }

    }
}
main()




