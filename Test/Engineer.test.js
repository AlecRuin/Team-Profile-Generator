const index = require("../index.js")
test("Create fake engineer with properties",()=>{
    var NewEmp= new index.Engineer("Mr Engineer", 12345,"Engineer@gmail.com","GithubLink")
    expect(NewEmp.getEmail()).toBe("Engineer@gmail.com")
    expect(NewEmp.getName()).toBe("Mr Engineer")
    expect(NewEmp.getRole()).toBe("Engineer")
    expect(NewEmp.getId()).toBe(12345)
    expect(NewEmp.getGithub()).toBe("GithubLink")
})