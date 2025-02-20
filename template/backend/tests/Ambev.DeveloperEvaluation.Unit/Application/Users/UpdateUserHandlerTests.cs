﻿using Ambev.DeveloperEvaluation.Application.Users.UpdateUser;
using Ambev.DeveloperEvaluation.Domain.Entities;
using Ambev.DeveloperEvaluation.Domain.Enums;
using Ambev.DeveloperEvaluation.Domain.Repositories;
using AutoMapper;
using FluentAssertions;
using NSubstitute;
using Xunit;

namespace Ambev.DeveloperEvaluation.Unit.Application.UsersTest
{
    public class UpdateUserHandlerTests
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UpdateUserHandler _handler;

        public UpdateUserHandlerTests()
        {
            _userRepository = Substitute.For<IUserRepository>();
            _mapper = Substitute.For<IMapper>();
            _handler = new UpdateUserHandler(_userRepository, _mapper);
        }

        [Fact(DisplayName = "Given valid user data When updating user Then returns success response")]
        public async Task Handle_ValidRequest_ReturnsSuccessResponse()
        {
            // Given
            var command = new UpdateUserCommand
            {
                Id = Guid.NewGuid(),
                Username = "UpdatedUser",
                Email = "updated@example.com",
                Phone = "123456789",
                Status = UserStatus.Active,
                Role = UserRole.Manager
            };

            var existingUser = new User
            {
                Id = command.Id,
                Username = "OldUser",
                Email = "old@example.com",
                Phone = "987654321",
                Status = UserStatus.Active,
                Role = UserRole.Manager
            };

            var updatedUser = new User
            {
                Id = command.Id,
                Username = command.Username,
                Email = command.Email,
                Phone = command.Phone,
                Status = command.Status,
                Role = command.Role
            };

            var result = new UpdateUserResult { Id = updatedUser.Id };

            _userRepository.GetByIdAsync(command.Id, Arg.Any<CancellationToken>()).Returns(existingUser);
            _mapper.Map(command, existingUser).Returns(updatedUser);
            _userRepository.UpdateAsync(command.Id, existingUser, Arg.Any<CancellationToken>()).Returns(updatedUser);
            _mapper.Map<UpdateUserResult>(updatedUser).Returns(result);

            // When
            var updateUserResult = await _handler.Handle(command, CancellationToken.None);

            // Then
            updateUserResult.Should().NotBeNull();
            updateUserResult.Id.Should().Be(updatedUser.Id);
            await _userRepository.Received(1).UpdateAsync(command.Id, existingUser, Arg.Any<CancellationToken>());
        }

        [Fact(DisplayName = "Given non-existent user When updating user Then throws exception")]
        public async Task Handle_UserNotFound_ThrowsException()
        {
            // Given
            var command = new UpdateUserCommand { Id = Guid.NewGuid() };
            _userRepository.GetByIdAsync(command.Id, Arg.Any<CancellationToken>()).Returns((User)null);

            // When
            var act = () => _handler.Handle(command, CancellationToken.None);

            // Then
            await act.Should().ThrowAsync<InvalidOperationException>().WithMessage($"User with ID {command.Id} not found");
        }

        [Fact(DisplayName = "Given invalid user data When updating user Then throws validation exception")]
        public async Task Handle_InvalidRequest_ThrowsValidationException()
        {
            // Given
            var command = new UpdateUserCommand(); // Empty command will fail validation

            // When
            var act = () => _handler.Handle(command, CancellationToken.None);

            // Then
            await act.Should().ThrowAsync<FluentValidation.ValidationException>();
        }
    }
}
