import React,{ Component } from 'react';

import { themesColor } from '../../skin-context';

import { Dropdown } from 'react-bulma-components';

import { 
    DropdownThemeWrapp
} from './styled';


class DropdownTheme extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownList: Object.values(themesColor),
            selected: themesColor.default.primaryLight
        }
    }

    onChange = async selected => { 
        await this.setState({ selected });
        const { dropdownList } = this.state;
        for (let i = 0; i < dropdownList.length; i++) {
            if(dropdownList[i].primaryLight === selected) {
                this.props.changeThemeColor(dropdownList[i]);
            }
        }
    }
    
    render() {
        return(
            <DropdownThemeWrapp 
                value={this.state.selected}
                onChange={this.onChange}
            >
                { this.state.dropdownList.map(theme =>
                    <Dropdown.Item
                        key={theme.primaryLight}
                        value={theme.primaryLight}
                        style={{ background: theme.primaryLight }}
                    />
                )}
            </DropdownThemeWrapp>
        )
    }
}

export default DropdownTheme;