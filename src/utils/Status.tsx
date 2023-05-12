const isButtonDisabled = (schedule) => {
    return (schedule.status !== 'upcoming'
    )
};
export default isButtonDisabled; 