import './helper.css';

export const collapse = (collapseSection, height) => {
    if(collapseSection) {

        if(collapseSection.classList.contains('show')){
            // collapse
            height = collapseSection.offsetHeight;
            collapseSection.style.height =  height + 'px';
            collapseSection.classList.add('collapsing');
            
            window.setTimeout(function(){
                collapseSection.style.height = 0;
            },1);
        
            window.setTimeout(function(){
                collapseSection.classList.remove('show');
                collapseSection.classList.remove('collapsing');
                collapseSection.style.height = null;
            }, 350);
        }else {
            // expand
            collapseSection.style.display = "block";
            height = collapseSection.offsetHeight;
            collapseSection.classList.add('collapsing');

            window.setTimeout(function() {
                collapseSection.style.height = height + 'px';
            }, 1);
          
            window.setTimeout(function() {
                collapseSection.classList.add('show');
                collapseSection.classList.remove('collapsing');
                collapseSection.style.display = null;
                collapseSection.style.height = null;
            }, 350);
        }
    }
}

export function checkLeapYear(year) {
    if( ( year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0 ) || ( year%100===0 && year % 400 === 0 ) ) {
        return true;
    }else {
        return false;
    }
}

export function checkLastDate(m,y) {
    var lastDay = 30;
    if(m === 2){
        if(checkLeapYear(y)) {
            lastDay = 29;
        }else{
            lastDay = 28;
        }
    }else if(m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) {
        lastDay = 31;
    }else {
        lastDay = 30;
    }
    return lastDay;
}