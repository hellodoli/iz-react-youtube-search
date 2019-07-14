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
