const btnAddUser = document.getElementById("btnAddUser");
const btnDoubleMoney = document.getElementById("btnDoubleMoney");
const btnShowMillionairs = document.getElementById("btnShowMillionairs");
const btnSort = document.getElementById("btnSort");
const btnCalculateTotal = document.getElementById("btnCalculateTotal");
const main = document.getElementById("main");

let persons = [];
//add the random person inside the main section
let addTODom = (person) => {
  let element = document.createElement("div");
  element.classList.add("person");
  element.innerHTML = `<span>${person.name}</span> 
  <span>$${person.wealth
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>`;
  main.appendChild(element);
  removeTotalDiv();
};
//get random person from external Api
let getRandomUser = async () => {
  //async دى معناها انك بتعمل حاجه وتروح تعمل حاجه اخرى على ما الاولى تخلص ودى تعتبر افضل من السطر اللى هكتبه تحته لانك مش بتركن جمب الحاجه لحد اما تخلص
  //sync      افضلasync بس ال async معناها انك بتنفذ وظيفه معينه بتستنى لحد اما تخلص عشان تنفذ وظيفه اخرى ودى بديل لل
  let res = await (await fetch("https://randomuser.me/api")).json();
  //first wait دى الى بتمسك السطر كله تحوله لفورمات جسون
  //second wait   apiدى الكلمه الثانيه بتاعت اسنكرونس الى بيفتش بيها الداتا من ال
  //fetch    api دى الى بتخليك تروح تنادى على
  const person = {
    name: `${res.results[0].name.first} ${res.results[0].name.last}`,
    // مرجعاهاapiدى اللى results
    wealth: Math.floor(Math.random() * 1000000),
  };
  persons.push(person);
  // هنا ضفتها فى ارى عشان الارى تكون شايله كل البيرسون عشان لو حبيت ارتب او افلتر او اجيب توتل
  addTODom(person);
  // هنا فى الدوم خليتها بيرسون مش بيرسونز مع ان الاثنين ينفعوا بس بيرسون افضل عشان مش كل اما اضيف يوزر جديد اروح اهد وابنى من الاول لا انا هنا ببعت بيرسون واحد فيروح مرسوم علطول
};
let doubleMoney = async () => {
  persons = persons.map((person) => {
    // هنا انا خليتها بيرسونز بتساوى كلا م ده عشان يخزنلى ويحفظلى فى الاخر الكلام ده فى بيرسونز
    //lambda exp قالك اول متشوف <= داخل اقواس ده اسمه
    return {
      name: person.name,
      wealth: person.wealth * 2,
    };
  });
  refreshPersonTable();
};

let showMillionairs = async () => {
  persons = persons.filter((person) => person.wealth >= 1000000);
  refreshPersonTable();
};

let sort = async () => {
  persons = persons.sort(
    (person1, person2) => person2.wealth - person1.wealth //كده انا رتت ترتيب تنازلى
  );
  refreshPersonTable();
};

let calculateTotal = async () => {
  removeTotalDiv(); //دى عشان لما اضغط على توتل مرتين وراا بعض يمسح القديمه ويحط الجديده مكانها
  let totalWealth = persons.reduce(
    (total, person) => (total += person.wealth),
    0
  );
  // هنا انا هرجع من التوتل قيمه واحده فبكده الارى مش اتغيرت عشان كده مش قولت بيرسونز تساوى
  //هنا الصفر اللى موجود عندى فى الاخر ده ده القيمه الابتدائيه بتاعت التوتل
  let element = document.createElement("div");
  element.classList.add("total");
  element.innerHTML = `<span>Total</span> 
  <span>$${totalWealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>`;
  main.appendChild(element);
};

btnAddUser.addEventListener("click", getRandomUser);
btnDoubleMoney.addEventListener("click", doubleMoney);
btnShowMillionairs.addEventListener("click", showMillionairs);
btnSort.addEventListener("click", sort);
btnCalculateTotal.addEventListener("click", calculateTotal);

const refreshPersonTable = () => {
  main.innerHTML = `<h2><span>Person</span> Wealth</h2>`;
  //قالك مثلا عندما بنستدعى الفانكشن دى فى الدابل معناها بقى فضيلى المين الاول مع الحفاظ على التايتل عشان اليوزر مش يظهر وتحته الدابل بتاعه لا انا عايز الدابل فقط
  persons.forEach((person) => addTODom(person));
  //عشان يضيف ليا بيرسون بيرسون  فى الدوم
};

//remove total div if it is existing لو هو موجود يعنى
//اللى انا بعمله ده عشان لما اجى اجيب توتل وبعدين اضيف يوزر التوتل عايزه يختفى عشان اليوز يظهرم تحت بعض
const removeTotalDiv = () => {
  let totalDiv = document.getElementsByClassName("total")[0];
  if (totalDiv != null) {
    //يعنى مش فاضى
    totalDiv.remove();
  }
};
