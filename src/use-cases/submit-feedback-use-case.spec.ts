import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,awhdawdakwhdkjhawkjdhw897a98wd98a7w89d7',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feeback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,awhdawdakwhdkjhawkjdhw897a98wd98a7w89d7',
        })).rejects.toThrow();
    });

    it('should not be able to submit feeback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,awhdawdakwhdkjhawkjdhw897a98wd98a7w89d7',
        })).rejects.toThrow();
    });

    it('should not be able to submit feeback with an invalid screenshot', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: '123Test',
        })).rejects.toThrow();
    });
});