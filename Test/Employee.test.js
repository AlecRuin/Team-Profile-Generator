const index = require("../index.js")
test("Create fake employee with properties",()=>{
    var NewEmp= new index.Employee("John", 234234,"ruinhard")
    
    /*console.log(NewEmp.getEmail())
    console.log(NewEmp.getName())
    console.log(NewEmp.getRole())*/
    expect(NewEmp.getEmail()).toBe("ruinhard")
    expect(NewEmp.getName()).toBe("John")
    expect(NewEmp.getRole()).toBe("Employee")
    expect(NewEmp.getId()).toBe(234234)
})