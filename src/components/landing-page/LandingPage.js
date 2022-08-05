import { Link } from "react-router-dom";

const pageOptions = [
    {
        id: 'config_page',
        key: 1,
        route: 'configs',
        allowedFor: ['ROLE_ADMIN'],
        label: 'Update Configuration'
    },
    {
        id: 'barcode_generator_page',
        key: 2,
        route: 'generate',
        allowedFor: ['ROLE_ADMIN'],
        label: 'Generate Barcode'
    },
    {
        id: 'barcode_unique_generator_page',
        key: 3,
        route: 'generate/unique',
        allowedFor: ['ROLE_ADMIN'],
        label: 'Generate Unique Barcode'
    },
    {
        id: 'barcode_generator_mod_page',
        key: 4,
        route: 'moderate/generate',
        allowedFor: ['ROLE_MODERATOR'],
        label: 'Generate Barcode'
    },
    {
        id: 'barcode_unique_generator_mod_page',
        key: 5,
        route: 'moderate/generate/unique',
        allowedFor: ['ROLE_MODERATOR'],
        label: 'Generate Unique Barcode'
    }
];

export const LandingPage = ({ user }) => (
    <>
        <h4>Select one of these options to continue</h4>
        {pageOptions.map((opt) => user?.roles?.includes(opt.allowedFor[0]) && (<Link to={opt.route}>{opt.label}</Link>))}
    </>
)
